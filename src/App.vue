<template>
<v-app v-bind:width="options.canvas.width" v-bind:height="options.canvas.height" class="ma-0 pa-0">
  <v-main>
    <v-container>
      <v-row>
        <v-col class="lg-6"><options-editor v-model="options"></options-editor></v-col>
      </v-row>
    </v-container>
  </v-main>
  <canvas id="canvas" v-bind:width="options.canvas.width" v-bind:height="options.canvas.height"></canvas>
</v-app>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import OptionsEditor from "./components/OptionsEditor.vue";
import { VBtn, VContainer, VRow, VCol, VTabs, VApp, VMain, VTabItem, VTab } from "vuetify/lib";

import { Options, defaultOptions, CanvasOptions, OvertoneConfig, WheelViewModeConfig } from './domain/models/options';
import { Note, NoteToMidi, scientificNote, Octave, PitchClass, midiToScientific } from "./domain/models/notes";
import { MidiBatcher } from "./domain/services/midiBatcher";
import { HSL, RGB, notesToColors, hslToHex, mixColors, HexColor, colorOvertones, hslToRgb, normalizeWeights } from "./domain/services/colorGiver";
import { indexBy, deepMap, flipMap, drawRandom } from "./domain/util/util";
import webmidi, { WebMidi } from "webmidi";

type ColorWheelDrawer = (hslsWithOvertones: HSL[][], config: WheelViewModeConfig) => void;

@Component ({
  components: {
    OptionsEditor,
    VApp, VMain,
    VTabs, VTab, VTabItem,
    VContainer, VRow, VCol,
    VBtn
  }
})

export default class App extends Vue {

  private options: Options = defaultOptions;
  private midiBatcher: MidiBatcher = new MidiBatcher();
  // private randomPixelator: (rgbs: RGB[]) => void = (x) => {}
  private ctx: (CanvasRenderingContext2D | undefined) = undefined;

  private randomPixelator = (_: RGB[]) => {};

  private concentricPixelator = (rgbs: RGB[][], emergent: RGB[], emergentBias: number, emergentBiasFloor: number) => {};

  private wheelDrawer: ColorWheelDrawer = (hsls: HSL[][], c: WheelViewModeConfig) => {} 

  resize() {
      this.options.canvas.width = window.innerWidth;
      this.options.canvas.height = window.innerHeight;
      this.randomPixelator = this.makeRandomPixelator(this.ctx!, this.options.canvas);
      this.concentricPixelator = this.makeConcentricPixelator(this.ctx!, this.options.canvas);
      this.wheelDrawer = this.makeColorWheelDrawer(this.ctx!, this.options.canvas);
  }

  created() {
    window.addEventListener("resize", this.resize);
  }
  
  destroyed() {
    window.removeEventListener("resize", this.resize);
  }

  drawAll(ctx: CanvasRenderingContext2D, colors: HexColor[][], dimensions: CanvasOptions)
  {
    const height = dimensions.height;
    const width = dimensions.width;

    const rows = colors.length;
    const rowSize = height / rows;
    for (let r = 0; r < rows; r++)
    {
      const colorsInRow = colors[r];
      const cols = colorsInRow.length;
      const colSize = width / cols;

      for (let c = 0; c < cols; c++)
      {
        const thisColor = colorsInRow[c];
        ctx.beginPath();
        ctx.fillStyle = thisColor;
        ctx.rect(c * colSize, r * rowSize, colSize, rowSize);
        ctx.fill();
      }
    }
  }

  makeColorWheelDrawer(ctx: CanvasRenderingContext2D, dimensions: CanvasOptions): ColorWheelDrawer
  {
    const width = dimensions.width;
    const height = dimensions.height;

    const arr = new Uint8ClampedArray(width * height * 4);
    const imageData = new ImageData(arr, width);

    let arrayInitialized = false;

    return (hsls: HSL[][], config: WheelViewModeConfig) =>
    {
      const radius = Math.min(width, height) / 2;
      const centerX = width / 2;
      const centerY = height / 2;

      if (!arrayInitialized)
      {
        const l = width * height;
        for (let i = 0; i < l; i+=1)
        {
          const y = Math.floor(i / width);
          const x = Math.floor(i - y * width);
          const dist = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
          if (dist < radius)
          {
            const theta = (Math.atan2(y - centerY, x - centerX) * (180/ Math.PI) + 360 + 90) % 360;
            const hsl = { hue: theta, saturation: 100, light: 100 * dist / radius }
            const rgb = hslToRgb(hsl);
            arr[i*4] = rgb.red;
            arr[i*4 + 1] = rgb.green;
            arr[i*4 + 2] = rgb.blue;
            arr[i*4 + 3] = 255;
          }
        }
        arrayInitialized = true;
      }

      ctx.putImageData(imageData, 0, 0);

      for (let j = 0; j < hsls.length; j++)
      {
        if (config.showEmergentOnly && j != hsls.length - 1)
          continue;

        if (!config.showEmergence && j == hsls.length - 1)
          continue;

        const hslWithOvertones = hsls[j];

        for (let i = 0; i < hslWithOvertones.length; i++)
        {
          if (!config.showOvertones && i > 0)
            continue;

          const hsl = hslWithOvertones[i];

          const spotlightSize = Math.floor(radius * config.spotlightScaleFactor  / (i + 1));
          const theta = (hsl.hue - 90) * Math.PI / 180;
          const magnitude = hsl.light * radius / 100;
          const x = magnitude * Math.cos(theta);
          const y = magnitude * Math.sin(theta);
          ctx.lineWidth = config.lineWidth;
          ctx.beginPath();
          ctx.arc(x + centerX, y + centerY, spotlightSize, 0, Math.PI * 2);
          ctx.strokeStyle = hslToHex({hue: (hsl.hue + 180) % 360, saturation: 100, light: 100 - hsl.light});
          ctx.fillStyle = hslToHex(hsl);
          ctx.stroke();
          ctx.fill();
        }
      }
    }
  }

  // todo: regenerate instance on size change
  makeRandomPixelator(ctx: CanvasRenderingContext2D, dimensions: CanvasOptions): ((rgbs: RGB[]) => void)
  {
    const width = dimensions.width;
    const height = dimensions.height;

    const arr = new Uint8ClampedArray(width * height * 4);
    const imageData = new ImageData(arr, width);
    return (rgbs: RGB[]) =>
    {
      const loopTimeStart = performance.now();
      for (let i = 0; i < arr.length; i+=4)
      {
        const c = rgbs[Math.floor(Math.random()*rgbs.length)];
        arr[i] = c.red;
        arr[i + 1] = c.green;
        arr[i + 2] = c.blue;
        arr[i + 3] = 255;
      }
      const loopTimeEnd = performance.now();
      // console.log("loop time: " + (loopTimeEnd - loopTimeStart));

      ctx.putImageData(imageData, 0, 0);
    }
  }

// todo: resize
  makeConcentricPixelator(ctx: CanvasRenderingContext2D, dimensions: CanvasOptions)
  {
    const width = dimensions.width;
    const height = dimensions.height;

    const totalElements = width * height * 4;
    const arr = new Uint8ClampedArray(width * height * 4);
    const imageData = new ImageData(arr, width);
    return (rgbs: RGB[][], emergent: RGB[], emergentBias: number, emergentBiasFloor: number) =>
    {
      if (rgbs.length == 1)
      {
        this.randomPixelator(rgbs[0]);
        return;
      }
      const loopTimeStart = performance.now();
      let multiplier = totalElements / rgbs.length - 1; multiplier -= (multiplier % 4);
      const end = multiplier;
      const begin = 0;

      const midpoint = (end + begin) / 2;
      const d = (end - begin) / 2;

      for (let i = 0; i < end; i+=4)
      {
        const useEmergence = Math.random() - emergentBiasFloor < (Math.abs(i - midpoint) / d) * emergentBias;
        for (let j = 0; j < rgbs.length; j++)
        {
          const c = useEmergence ? 
            emergent[Math.floor(Math.random()*emergent.length)]
            : rgbs[rgbs.length - j - 1][Math.floor(Math.random()*rgbs[j].length)];
            arr[j*multiplier + i] = c.red;
            arr[j*multiplier + i + 1] = c.green;
            arr[j*multiplier + i + 2] = c.blue;
            arr[j*multiplier + i + 3] = 255;
        }
      }

      const loopTimeEnd = performance.now();
      // console.log("loop time: " + (loopTimeEnd - loopTimeStart));

      ctx.putImageData(imageData, 0, 0);
    }
  }

  mounted()
  {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    this.ctx = ctx;

    this.resize();

      let noNotesForMs = 0;
      const tryClear = () => {
        if (noNotesForMs > this.options.display.waitBeforeClearMilliseconds) {
          ctx.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);
          noNotesForMs = 0;
        } else {
          noNotesForMs += this.options.display.tickMilliseconds;
        }
      }

      const renderSingleColor = () => {
        const notes = this.midiBatcher.getNotes();
        const colors = notesToColors(this.options.circle, notes);
        if (colors.length == 0)
          tryClear();
        
        else
        {
          const color = mixColors(this.options.mix, colors, notes.map(n => n.velocity));
          ctx.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);
          ctx.rect(0, 0, this.options.canvas.width, this.options.canvas.height);
          ctx.fillStyle = hslToHex(color);
          ctx.fill();
        }
        this.midiBatcher.tick(50);
    };

      const renderOvertonesGrid = () => {
        const notes = this.midiBatcher.getNotes();
        const colors = notesToColors(this.options.circle, notes);
        if (colors.length == 0)
          tryClear();

        else
        {
          const withOvertones = colors.map(c => colorOvertones(c, this.options.overtone).map(wc => wc.color));
          withOvertones.push(flipMap(withOvertones, c => mixColors(this.options.mix, c, notes.map(n => n.velocity))));
          const hexOvertones = deepMap(withOvertones, hslToHex);
          this.drawAll(ctx, hexOvertones, this.options.canvas);
        }
      }

      const pixelateRandomly = () => {
        const notes = this.midiBatcher.getNotes();
        const rawColors = notesToColors(this.options.circle, notes);
        if (rawColors.length == 0)
          tryClear();
        
        else
        {
          // first, weight with overtones, then weight with root/middle/etc. etc.?
          const cs = [... rawColors];
          if (cs.length > 1)
            cs.push(mixColors(this.options.mix, cs, notes.map(n => n.velocity)));
          const withOvertones = cs.map(c => colorOvertones(c, this.options.overtone));
          for (let i = 0; i < withOvertones.length; i++)
          {
            if (i == 0)
              withOvertones[i].forEach(wc => wc.weight *= this.options.render.rootBias);
            else if (i == withOvertones.length - 1)
              withOvertones[i].forEach(wc => wc.weight *= this.options.render.emergentBias);
            else if (i == withOvertones.length - 2)
              withOvertones[i].forEach(wc => wc.weight *= this.options.render.melodyBias);
            else 
              withOvertones[i].forEach(wc => wc.weight *= this.options.render.middleBias);
          }
          const flatColors = withOvertones.flat();
          normalizeWeights(flatColors);
          const drawingPool: RGB[] = [];
          flatColors.forEach(wc => {
            const rgb = hslToRgb(wc.color);
            for (let i = 0; i < Math.floor(10000 * wc.weight); i++)
              drawingPool.push(rgb);
          })

          this.randomPixelator(drawingPool);
        }
      }

      const pixelateConcentrically = () => {
        const notes = this.midiBatcher.getNotes();
        const rawColors = notesToColors(this.options.circle, notes);
        if (rawColors.length == 0)
          tryClear();
        
        else
        {
          // first, weight with overtones, then weight with root/middle/etc. etc.?
          const cs = [... rawColors];
          const withOvertones = cs.map(c => colorOvertones(c, this.options.overtone));
          const emergent = cs.length > 0 ? colorOvertones(mixColors(this.options.mix, cs, notes.map(n => n.velocity)), this.options.overtone) : [];

          const drawingPool: RGB[][] = [];
          withOvertones.forEach(wcs => {
            const result: RGB[] = [];
            wcs.forEach(wc => {
              const rgb = hslToRgb(wc.color);
              // todo: could write reusable function that looked at smallest weight and determined min number needed to have that represented once?
              for (let i = 0; i < Math.floor(100 * wc.weight); i++)
                result.push(rgb);
            });
            drawingPool.push(result);
            }
          );

          const emergentDrawingPool: RGB[] = [];
          emergent.forEach(wc => {
            const rgb = hslToRgb(wc.color);
            for (let i = 0; i < Math.floor(100 * wc.weight); i++)
              emergentDrawingPool.push(rgb);
          });

          this.concentricPixelator(drawingPool, emergentDrawingPool, this.options.render.emergentBias, this.options.render.emergentBiasFloor);
        }
      }

      const renderColorWheel = () =>
      {
        const notes = this.midiBatcher.getNotes();
        const rawColors = notesToColors(this.options.circle, notes);
        const cs = [... rawColors];
        const withOvertones = cs.map(c => colorOvertones(c, this.options.overtone));
        const emergent = colorOvertones(mixColors(this.options.mix, cs, notes.map(n => n.velocity)), this.options.overtone);
        withOvertones.push(emergent);

        this.wheelDrawer(deepMap(withOvertones, wc => wc.color), this.options.wheelViewModeConfig);
      }

      const go = () => {
        this.options.viewMode.single ? renderSingleColor()
        : this.options.viewMode.overtoneGrid ? renderOvertonesGrid()
        : this.options.viewMode.wheel ? renderColorWheel()
        : this.options.viewMode.randomPixelation ? pixelateRandomly()
        : pixelateConcentrically();
      }

      const runLoop = () => {
        go();
        setTimeout(runLoop, this.options.display.tickMilliseconds);
      }

      setTimeout(runLoop, this.options.display.tickMilliseconds);

      webmidi.enable(ex => {
        if (ex != undefined) {
          console.log("Error trying to setup midi listener: " + ex.name);
        } else {
          console.log("Successfully set up midi listner.")
        }
    
        console.log(webmidi.inputs);
        console.log(webmidi.outputs);
    
        if (webmidi.inputs.length == 0) {
          console.log("No midi input device detected.");
        }
    
        const input = webmidi.inputs[0];
        input.addListener("midimessage", "all", e =>  { 
          if (e.data[0] >> 4 == 11 && e.data[1] == 64)
          {
            if (e.data[2] <= 63)
              this.midiBatcher.endSustain();
            else
              this.midiBatcher.beginSustain();
          }
        });
        input.addListener("noteon", "all", e => {
          this.midiBatcher.handleNoteOn(
            midiToScientific(e.note.number, e.note.octave),
            e.velocity
          );
          // render();
        });
    
        input.addListener("noteoff", "all", e => {
          this.midiBatcher.handleNoteOff(
            midiToScientific(e.note.number, e.note.octave)
          );
        });
      }, true);
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
