/**编辑 | 创建 | 阅读 | 不可查看 */
type FormPermission = 'edit' | 'create' | 'read' | 'invisible';
declare module '*.module.less' {
  const classes: CSSModuleClasses
}

declare module 'js-xlsx';
declare module 'js-export-excel';


type UploadFileType = "file" | "avatar" | "image";