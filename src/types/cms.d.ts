export interface WordPressBlock {
  blockName: string;
  attrs?: Record<string, any>;
  innerHTML?: string;
}

export interface WordPressService {
  title: string;
  content: string;
}

export interface WordPressPage {
  title: string;
  content: string;
}

export interface ShortcodeContext {
  serviceName?: string;
  locationName?: string;
  regionName?: string;
  [key: string]: any;
}
