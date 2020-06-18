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
  }
}