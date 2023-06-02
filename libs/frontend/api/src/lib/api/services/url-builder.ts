import { environment } from 'environments/environment';

export class UrlBuilder {
  private apiUrl: string = environment.apiUrl;
  private pathParams: string[] = [];
  private queryParams: string[] = [];

  private endpoint = '';

  withEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    return this;
  }

  withPathParam(param: string) {
    this.pathParams.push(`/${param}`);
    return this;
  }

  withQueryParam(param: string, value: string | number) {
    this.queryParams.push(`${param}=${value}`);
    return this;
  }

  private buildParams() {
    const paramString = this.pathParams.join('');
    if (this.queryParams.length > 0) {
      const queryString = this.queryParams.join('&');
      return `${paramString}?${queryString}`;
    }
    return paramString;
  }

  build() {
    if (this.endpoint === '') {
      throw new Error('Endpoint must not be empty.');
    }
    return `${this.apiUrl}/${this.endpoint}${this.buildParams()}`;
  }
}
