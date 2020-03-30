import { Template } from "../model/model";

export interface CoronaChatAPIInterface {
  getTemplate(): Promise<Template>
  updateTemplate(template: Template): Promise<void>
}