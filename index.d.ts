declare module "ampify" {
  export = ampify;
}

declare function ampify(html: string, options?: IOptions): Promise<string>;

interface IOptions {
  cwd?: string;
  round?: boolean;
}
