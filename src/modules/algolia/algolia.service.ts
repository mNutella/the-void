import { Inject, Injectable } from '@nestjs/common';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import { RequestOptions } from '@algolia/transporter';
import {
  MultipleQueriesQuery,
  MultipleQueriesResponse,
  IndexOperationResponse,
  SecuredApiKeyRestrictions,
  ApiKeyACLType,
  UpdateApiKeyOptions,
  UpdateApiKeyResponse,
  AddApiKeyOptions,
  AddApiKeyResponse,
  DeleteApiKeyResponse,
  ListApiKeysResponse,
  MultipleBatchRequest,
  MultipleBatchResponse,
  GetLogsResponse
} from '@algolia/client-search';
import { WaitablePromise } from '@algolia/client-common';
import { AlgoliaModuleOptions } from './algolia-module-options';
import { ALGOLIA_MODULE_OPTIONS } from './algolia.constants';

@Injectable()
export class AlgoliaService {
  private readonly algoliaClient: SearchClient;

  constructor(
    @Inject(ALGOLIA_MODULE_OPTIONS)
    private readonly options: AlgoliaModuleOptions,
  ) {
    this.algoliaClient = algoliasearch(options.applicationId, options.apiKey, options.clientOptions);
  }

  /**
   * Initialization of the index
   * https://github.com/algolia/algoliasearch-client-js#init-index---initindex
   */
  initIndex(indexName: string): SearchIndex {
    return this.algoliaClient.initIndex(indexName);
  }

  /**
   * Query on multiple index
   * https://github.com/algolia/algoliasearch-client-js#multiple-queries---multiplequeries
   */
  search<T = any>(
    queries: Array<{
      indexName: string;
      query: string;
      params: MultipleQueriesQuery;
    }>,
  ): Promise<MultipleQueriesResponse<T>> {
    return this.algoliaClient.search(queries);
  }

  /**
   * Query for facet values of a specific facet
   */
  // searchForFacetValues(
  //   queries: [{ indexName: string; params: SearchForFacetValues.Parameters }],
  // ): Promise<SearchForFacetValues.Response[]> {
  //   return this.algoliaClient.searchForFacetValues(queries);
  // }

  /**
   * clear browser cache
   * https://github.com/algolia/algoliasearch-client-js#cache
   */
  clearCache(): void {
    this.algoliaClient.clearCache();
  }

  /**
   * kill alive connections
   * https://github.com/algolia/algoliasearch-client-js#keep-alive
   */
  destroy(): void {
    this.algoliaClient.destroy();
  }

  /**
   * Add a header to be sent with all upcoming requests
   */
  // setExtraHeader(name: string, value: string): void {
  //   this.algoliaClient.setExtraHeader(name, value);
  // }

  /**
   * Get the value of an extra header
   */
  // getExtraHeader(name: string): string {
  //   return this.algoliaClient.getExtraHeader(name);
  // }

  /**
   * Remove an extra header for all upcoming requests
   */
  // unsetExtraHeader(name: string): void {
  //   this.algoliaClient.unsetExtraHeader(name);
  // }

  /**
   * List all your indices along with their associated information (number of entries, disk size, etc.)
   * https://github.com/algolia/algoliasearch-client-js#list-indices---listindexes
   */
  listIndices(): Promise<any> {
    return this.algoliaClient.listIndices();
  }

  /**
   * Delete a specific index
   * https://github.com/algolia/algoliasearch-client-js#delete-index---deleteindex
   */
  // deleteIndex(name: string): Promise<Task> {
  //   return this.algoliaClient.deleteIndex(name);
  // }

  /**
   * Copy settings of an index from a specific index to a new one
   * https://github.com/algolia/algoliasearch-client-js#copy-index---copyindex
   */
  copyIndex(
    from: string,
    to: string,
    scope?: Array<'settings' | 'synonyms' | 'rules'>,
  ): WaitablePromise<IndexOperationResponse> {
    return this.algoliaClient.copyIndex(from, to, scope);
  }

  /**
   * Move index to a new one (and will overwrite the original one)
   * https://github.com/algolia/algoliasearch-client-js#move-index---moveindex
   */
  moveIndex(from: string, to: string): WaitablePromise<IndexOperationResponse> {
    return this.algoliaClient.moveIndex(from, to);
  }
  /**
   * Generate a public API key
   * https://github.com/algolia/algoliasearch-client-js#generate-key---generatesecuredapikey
   */
  generateSecuredApiKey(key: string, filters: SecuredApiKeyRestrictions): string {
    return this.algoliaClient.generateSecuredApiKey(key, filters);
  }

  /**
   * Perform multiple operations with one API call to reduce latency
   * https://github.com/algolia/algoliasearch-client-js#custom-batch---batch
   */
  multipleBatch(requests: MultipleBatchRequest[], requestOptions?: RequestOptions): WaitablePromise<MultipleBatchResponse> {
    return this.algoliaClient.multipleBatch(requests, requestOptions);
  }

  /**
   * Lists global API Keys
   * https://github.com/algolia/algoliasearch-client-js#backup--export-an-index---browse
   */
  listApiKeys(): Promise<ListApiKeysResponse> {
    return this.algoliaClient.listApiKeys();
  }

  /**
   * Add global API Keys
   * https://github.com/algolia/algoliasearch-client-js#add-user-key---addapikey
   */
  addApiKey(
    acl: ApiKeyACLType[],
    options?: AddApiKeyOptions & Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>,
  ): WaitablePromise<AddApiKeyResponse> {
    return this.algoliaClient.addApiKey(acl, options);
  }

  /**
   * Update global API key
   * https://github.com/algolia/algoliasearch-client-js#update-user-key---updateapikey
   */
  updateApiKey(
    key: string,
    options?: UpdateApiKeyOptions & Pick<RequestOptions, string | number>,
  ): WaitablePromise<UpdateApiKeyResponse> {
    return this.algoliaClient.updateApiKey(key, options);
  }

  /**
   * Gets the rights of a global key
   * https://github.com/algolia/algoliasearch-client-js#update-user-key---updateapikey
   */
  getApiKey(key: string): Promise<any> {
    return this.algoliaClient.getApiKey(key);
  }

  /**
   * Deletes a global key
   * https://github.com/algolia/algoliasearch-client-js#delete-user-key---deleteapikey
   */
  deleteApiKey(key: string): WaitablePromise<DeleteApiKeyResponse> {
    return this.algoliaClient.deleteApiKey(key);
  }

  /**
   * Get 1000 last events
   * https://github.com/algolia/algoliasearch-client-js#get-logs---getlogs
   */
  getLogs(options: RequestOptions): Promise<GetLogsResponse> {
    return this.algoliaClient.getLogs(options);
  }
}
