import { Template } from '../model/model';

export interface CoronaChatAPIInterface {
  getTemplate(): Promise<Template>;
  getDefaultTemplate(): Promise<Template>;
  updateTemplate(template: Template): Promise<void>;
}
