import 'fabric';

declare module 'fabric' {
  export namespace fabric {
    interface Canvas {
      undo?: () => void;
      redo?: () => void;
    }
  }
}
