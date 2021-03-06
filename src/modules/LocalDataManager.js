const remoteURL = "http://localhost:5002"

export default {
  get(section, id) {
    return fetch(`${remoteURL}/${section}/${id}`).then(result => result.json())
  },
  getAll(section) {
    return fetch(`${remoteURL}/${section}`).then(result => result.json())
  },
  delete(section, id) {
    return fetch(`${remoteURL}/${section}/${id}`, {
      method: "DELETE"
    }).then(result => result.json)
  },
  post(section, newData) {
    return fetch(`${remoteURL}/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    }).then(data => data.json)
  },
  update(section, updatedData, id) {
    return fetch(`${remoteURL}/${section}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    }).then(data => data.json)
  },
  getRank(tier, division) {
    return fetch(`${remoteURL}/ranks?tier=${tier}&division=${division}`).then(result => result.json())
  },
  getRoleByName(role) {
    return fetch(`${remoteURL}/roles?name=${role}`).then(result => result.json())
  },
  getModeByName(mode) {
    return fetch(`${remoteURL}/gametypes?type=${mode}`).then(result => result.json())
  },
  getResponsesByPostId(id) {
    return fetch(`${remoteURL}/responses?postId=${id}`).then(result => result.json())
  },
  getQueryByOneParam(query, param, value){
    return fetch(`${remoteURL}/${query}?${param}=${value}`).then(result => result.json())
  }
}