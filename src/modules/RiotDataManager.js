import apikey from './riotapikey'

const key = apikey
export default {
  searchAccount(name) {
    return fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${key}`)
      .then(accountInfo => accountInfo.json())
  },
  getRanked(id) {
    return fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apikey}`)
      .then(rankedInfo => rankedInfo.json())
  }
}