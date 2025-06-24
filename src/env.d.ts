/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
}

declare module "*.riv" {
  const content: any;
  export default content;
}
