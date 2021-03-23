module.exports.aniq = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type, isAdult: false) {
      id
      siteUrl
      title {
        romaji
        english
        native
      }
      isAdult
      episodes
      type
      genres
      format
      coverImage {
        extraLarge
      }
      status(version: 2)
      description(asHtml: true)
      averageScore
    }
  }
`;
module.exports.usrq = `
query ($search: String) {
  User(name: $search) {
      id
      name
      siteUrl
      avatar {
          large
      }
      about (asHtml: true),
      statistics {
          anime {
              minutesWatched
          }
          manga {
              chaptersRead
          }
      }
  }
}`;
module.exports.charq = `
query ($search: String) {
    Character(search: $search) {
        id
        siteUrl
        name {
            first
            last
        }
        image {
            large
        }
        description(asHtml: true)
    }
}
`;