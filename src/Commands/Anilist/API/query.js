const query = `
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
const usrq = `
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
const charq = `
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

module.exports = { query, usrq, charq };
