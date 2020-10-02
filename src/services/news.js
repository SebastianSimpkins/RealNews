import {orderBy} from 'lodash';
import { _api_key, language, category, articles_url} from '../config/rest_config';

export async function getArticles() {
  try {
    let articles = await fetch(`${articles_url}`,{
      headers: {
        'X-API-KEY': _api_key
      }
    });
    let result = await articles.json();
    articles= null;
    return orderBy(result.articles,'publishedAt','desc');
    this.setState({isFetching:false})
  } catch (error) {
    throw error
  }

}
