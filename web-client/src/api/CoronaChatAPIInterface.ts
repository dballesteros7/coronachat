import { Template, User } from '../model/model';

export interface CoronaChatAPIInterface {
  getOrganizationId(): Promise<string>;
  getTemplate(): Promise<Template>;
  getDefaultTemplate(): Promise<Template>;
  updateTemplate(template: Template): Promise<void>;
  login(username: string, password: string): Promise<User>;
  logout(): Promise<void>;
}
