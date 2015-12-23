(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

SupCore.system.api.registerPlugin("typescript", "Oblask", {
    code: "namespace Oblask {\n  export function test() {\n    console.log(\"Hello\");\n  }\n}\nwindow.Oblask = Oblask;",
    defs: "declare namespace Oblask {\n  function test()\n}\n"
});
SupCore.system.api.registerPlugin("typescript", "Oblask.Audio", {
    code: "namespace Oblask {\r\n  export namespace Audio {\r\n    export class Playlist {\r\n  \r\n      private paths: string[];\r\n      private backup: any[];\r\n    \r\n      private sounds: Sup.Audio.SoundPlayer[];\r\n      private timer = 0;\r\n      private actions = [\"play\", \"playAll\", \"pause\", \"stop\", \"add\", \"replace\", \"remove\", \"removeAll\"];\r\n      private multiple: boolean;\r\n      private canLoop: boolean;\r\n    \r\n\r\n      constructor(sounds: string[], multiple?: boolean) {\r\n        this.paths = sounds;\r\n        this.sounds = [];\r\n        \r\n        this.multiple = multiple || true;\r\n        this.canLoop = true;\r\n        \r\n        //let exist = this.checkExistSound();\r\n        \r\n        for(let path in this.paths) {\r\n          this.sounds.push(new Sup.Audio.SoundPlayer(this.paths[path]));\r\n        }\r\n\r\n        Sup.log(this.sounds);\r\n      }\r\n\r\n      play(index: any, loop?: boolean) {\r\n        if(typeof index == \"number\") {\r\n          for(let sound in this.sounds) {\r\n            if(!loop) {\r\n              if(sound != index) {\r\n                if(this.sounds[sound] != null) this.sounds[sound].stop();\r\n                else Sup.log(\"Index error: index is empty\");\r\n              }\r\n            }\r\n            else {\r\n              if(this.sounds[sound] != null) this.sounds[sound].stop();\r\n              else Sup.log(\"Index error: index is empty\");\r\n            }\r\n          }\r\n          if(this.sounds[index] != null) this.sounds[index].play();\r\n          else Sup.log(\"Index error: index is empty\");\r\n          \r\n          this.setLoop(index);\r\n        }\r\n        else {\r\n          for(let sound in this.sounds) {\r\n            for(let i in index) {\r\n              if(!loop) {\r\n                if(sound != index[i]) {\r\n                  if(this.sounds[index[i]] != null) this.sounds[index[i]].stop();\r\n                  else Sup.log(\"Index error: index is empty\");\r\n                }\r\n              }\r\n              else {\r\n                if(this.sounds[index[i]] != null) this.sounds[index[i]].stop();\r\n                else Sup.log(\"Index error: index is empty\");\r\n              }\r\n            }\r\n          }\r\n          for(let i in index) {\r\n            Sup.log(index[i]);\r\n            if(this.sounds[index[i]] != null) this.sounds[index[i]].play();\r\n            else Sup.log(\"Index error: index is empty\");\r\n          }\r\n        }\r\n      }\r\n    \r\n      playAll() {\r\n        let list = [];\r\n        for(let sound in this.sounds) if(this.sounds[sound] != null) list.push(sound);\r\n        this.play(list, true);\r\n      }\r\n\r\n      stop(index?: number) {\r\n        let i = index;\r\n        \r\n        if(!this.isPlaying()) {\r\n          return;\r\n        }\r\n           \r\n        if(i != null) {\r\n          if(this.sounds[i] != null) this.sounds[index].stop();\r\n          else Sup.log(\"Index error: index is empty\");\r\n        }\r\n        else {\r\n          for(let sound in this.sounds) {\r\n            if(this.sounds[sound] != null) this.sounds[sound].stop();\r\n            else Sup.log(\"Index error: index is empty\");\r\n          }\r\n        }\r\n      }\r\n\r\n      pause(index?: number) {\r\n        let i = index;\r\n        if(i != null) {\r\n          if(this.sounds[i] != null) this.sounds[index].pause();\r\n          else Sup.log(\"Index error: index is empty\");\r\n        }\r\n        else {\r\n          for(let sound in this.sounds) {\r\n            if(this.sounds[sound] != null) this.sounds[sound].pause();\r\n            else Sup.log(\"Index error: index is empty\");\r\n          }\r\n        }\r\n      }\r\n\r\n      add(sound: string) {\r\n        for(let path in this.paths) {\r\n          if(this.paths[path] === sound) {\r\n            \r\n            Sup.log(\"Warning: this sound already exists in this playlist\");\r\n          }\r\n        }\r\n        this.paths.push(sound);\r\n        this.sounds.push(new Sup.Audio.SoundPlayer(sound));\r\n      }\r\n    \r\n      replace(sound: string, index: number) {\r\n        if(this.sounds[index] != null) {\r\n          for(let s in this.sounds) {\r\n            if(this.paths[s] === sound) {\r\n              Sup.log(\"Warning: this sound already exists in this playlist\");\r\n            }\r\n          }\r\n          this.paths[index] = sound;\r\n          this.sounds[index] = new Sup.Audio.SoundPlayer(sound);\r\n        }\r\n        else {\r\n          for(let i = 0; i <= index; i++) {\r\n            if(i < index) {\r\n              if(this.sounds[i] == null) {\r\n                this.sounds[index] = null;\r\n              }\r\n            }\r\n            else if(i == index) {\r\n              this.paths[index] = sound;\r\n              this.sounds[index] = new Sup.Audio.SoundPlayer(sound);\r\n            }\r\n          }\r\n        }\r\n      }\r\n\r\n      remove(index: string) {\r\n        delete this.sounds[index];\r\n      }\r\n\r\n      isPlaying(index?: any) {\r\n        if(index != null) {\r\n          if(typeof index == \"number\") {\r\n            if(this.sounds[index].isPlaying()) return true;\r\n            else return false;\r\n          }\r\n          else {\r\n            for(let s in this.sounds) {\r\n              if(this.sounds[s] === index) {\r\n                if(this.sounds[s].isPlaying()) return true;\r\n                else return false;\r\n              }\r\n            }\r\n          }\r\n        }\r\n        else {\r\n          for(let sound in this.sounds) {\r\n            if(this.sounds[sound].isPlaying()) return true;\r\n          }\r\n          return false;\r\n        }\r\n      }\r\n                \r\n      setTimer(time: number, loop: boolean, action: string, ...args) {\r\n        if(this.canLoop) this.timer++;\r\n        \r\n        if(this.timer >= time) {\r\n          this.timer = 0;\r\n          if(this.actions.indexOf(action) <= -1) {\r\n            Sup.log(\"this action doesn't exist \\\"\"+action+\"\\\"\");//, \"Action Error\", true);\r\n          }\r\n          \r\n          if(!loop) this.canLoop = false;\r\n          \r\n          for(let act in this.actions) {\r\n            if(this.actions[act] === action) {\r\n              this[action](args[0]);\r\n            }\r\n            \r\n          }\r\n        }\r\n      }\r\n    \r\n      replay(index: number, timer?: number) {\r\n        if(this.isPlaying(index)) {\r\n          this.timer+=1/60;\r\n          \r\n          if(this.timer >= timer) {\r\n            this.stop(index);\r\n            this.play(index, true);\r\n            \r\n            this.timer = 0;\r\n          }\r\n        }\r\n        else {\r\n          if(timer == null) {\r\n            this.play(index, true);\r\n          }\r\n          else {\r\n            this.play(index, true);\r\n            \r\n            this.timer+=1/60;\r\n            if(this.timer >= timer) {\r\n              this.stop(index);\r\n              this.play(index, true);\r\n              \r\n              this.timer = 0;\r\n            }\r\n          }\r\n        }\r\n      }\r\n    \r\n      setVolume(value: number, index?: number) {\r\n        if(!index) {\r\n          let volumes = [];\r\n          for(let sound in this.sounds) {\r\n            this.sounds[sound].setVolume(value);\r\n          }\r\n        }\r\n        else {\r\n          this.sounds[index].setVolume(value);\r\n        }\r\n      }\r\n    \r\n      getVolume(index?: number) {\r\n        if(!index) {\r\n          let volumes = [];\r\n          for(let sound in this.sounds) {\r\n            volumes.push(this.sounds[sound].getVolume());\r\n          }\r\n        }\r\n        else {\r\n          return this.sounds[index].getVolume();\r\n        }\r\n      }\r\n    \r\n      setPan(value: number, index?: number) {\r\n        if(!index) {\r\n          for(let sound in this.sounds) {\r\n            this.sounds[sound].setPan(value);\r\n          }\r\n        }\r\n        else {\r\n          this.sounds[index].setPan(value);\r\n        }\r\n      }\r\n    \r\n      getPan(index?: number) {\r\n        if(!index) {\r\n          let panes = [];\r\n          for(let sound in this.sounds) {\r\n            panes.push(this.sounds[sound].getPan());\r\n          }\r\n        }\r\n        else {\r\n          return this.sounds[index].getPan();\r\n        }\r\n      }\r\n    \r\n      setPitch(value: number, index?: number) {\r\n        if(!index) {\r\n          for(let sound in this.sounds) {\r\n            this.sounds[sound].setPitch(value);\r\n          }\r\n        }\r\n        else {\r\n          this.sounds[index].setPitch(value);\r\n        }\r\n      }\r\n    \r\n      getPitch(index?: number) {\r\n        if(!index) {\r\n          let pitches = [];\r\n          for(let sound in this.sounds) {\r\n            pitches.push(this.sounds[sound].getPitch());\r\n          }\r\n        }\r\n        else {\r\n          return this.sounds[index].getPitch();\r\n        }\r\n      }\r\n      \r\n      setLoop(value: boolean, index?: number) {\r\n        if(!index) {\r\n          for(let sound in this.sounds) {\r\n            this.sounds[sound].setLoop(value);\r\n          }\r\n        }\r\n        else {\r\n          this.sounds[index].setLoop(value);\r\n        }\r\n      }\r\n      \r\n      getState(index?: number): Sup.Audio.SoundPlayer.State | Sup.Audio.SoundPlayer.State[] {\r\n        if(!index) {\r\n          let states = [];\r\n          for(let sound in this.sounds) {\r\n            states.push(this.sounds[sound].getState());\r\n          }\r\n          return states;\r\n        }\r\n        else {\r\n          return this.sounds[index].getPitch();\r\n        }\r\n      }\r\n    \r\n      getPath(index?: number): string | string[] {\r\n        if(index == null) {\r\n          return this.paths;\r\n        }\r\n        else {\r\n          return this.paths[index];\r\n        }\r\n      }\r\n  \r\n      getMultiple() {\r\n        return this.multiple;\r\n      }\r\n  \r\n      disableMultiple() {\r\n        this.multiple = false;\r\n        this.format();\r\n      }\r\n  \r\n      enableMultiple(restore?: boolean) {\r\n        this.multiple = true;\r\n                           \r\n        if(restore) {\r\n          this.paths = this.backup[\"paths\"];\r\n          this.sounds = this.backup[\"sounds\"];\r\n        }\r\n      }\r\n      \r\n      private format() {\r\n        this.backup[\"paths\"] = this.paths;\r\n        this.backup[\"sounds\"] = this.sounds;\r\n                           \r\n        for(let sound in this.paths) {\r\n          let index = this.getIndex(this.paths[sound]);\r\n          if(typeof index === \"string\") {\r\n            continue;\r\n          }\r\n          else {\r\n            let increment = 0;\r\n            for(let i = index.length-1; i >= 0; i++) {\r\n              if(increment > index.length-1) {\r\n                this.paths.splice(i, 1);\r\n                this.sounds.splice(i, 1);\r\n              }\r\n              increment++;\r\n            }\r\n          }\r\n        }\r\n      }\r\n    \r\n      getIndex(sound : string) {\r\n        let index = [];\r\n\r\n        for(let s in this.sounds) {\r\n          if(this.paths[s] === sound) {\r\n            index.push(+s);\r\n          }\r\n        }\r\n        \r\n        if(index.length == 1) {\r\n          return index[0];\r\n        }\r\n        return index;\r\n      }\r\n    \r\n      getSounds() {\r\n        return this.sounds;\r\n      }\r\n    \r\n      /*private checkExistSound() {\r\n        var index = [];\r\n        for(var sound in this.paths) {\r\n          if(!Sup.get(this.paths[sound])) {\r\n            Sup.log(\"Error: this sound doesn't exist\");\r\n            this.sounds[sound] == null;\r\n            index.push(sound);\r\n          }\r\n        }\r\n        return index;\r\n      }*/\r\n    \r\n      checkDouble() {\r\n        let double = [];\r\n        for(let path in this.paths) {\r\n          let index = this.getIndex(this.paths[path]);\r\n          \r\n          if(typeof index !== \"number\") {\r\n            let i = index.toString();\r\n            if(double.indexOf(i) == -1) double.push(i);\r\n          }\r\n        }\r\n        \r\n        for(let i in double) {\r\n          double[i] = JSON.parse(\"[\"+double[i]+\"]\");\r\n        }\r\n        \r\n        return double;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\n\r\n\r\n",
    defs: "declare namespace Oblask {\r\n  namespace Audio {\r\n    class Playlist {\r\n      constructor(sounds: string[], multiple?: boolean);\r\n      \r\n      play(index: any, loop?: boolean);\r\n      pause(index?: number);\r\n      stop(index?: number);\r\n      playAll();\r\n      replay(index: number, timer?: number);\r\n\r\n      add(sound: string);\r\n      replace(sound: string, index: number);\r\n      remove(index: number);\r\n      removeAll();\r\n\r\n      isPlaying(index?: string);\r\n      getIndex(sound: string);\r\n\r\n      setVolume(value: number, index?: number);\r\n      getVolume(index?: number);\r\n      setPan(value: number, index?: number);\r\n      getPan(index?: number);\r\n      setPitch(value: number, index?: number);\r\n      getPitch(index?: number);\r\n      setLoop(value: boolean, index?: number);\r\n      getPath(index?: number): string | string[];\r\n      getState(index?: number): Sup.Audio.SoundPlayer.State | Sup.Audio.SoundPlayer.State[];\r\n      getSounds();\r\n      \r\n      getMultiple();\r\n      disableMultiple();\r\n      enableMultiple();\r\n      checkDouble();\r\n    }\r\n  }\r\n}\r\n"
});

},{}]},{},[1]);
