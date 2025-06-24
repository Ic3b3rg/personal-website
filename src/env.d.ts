/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly GH_TOKEN: string;
}

declare module "*.riv" {
  const content: any;
  export default content;
}
