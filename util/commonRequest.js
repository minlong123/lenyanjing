import { findByCode, getCommonId } from "@/api/config.js";

const fetch = {
  getCodeAndId: function getCodeAndId(codeTag, prefix) {
    return new Promise((resolve, reject) => {
      var code = "";
      var id = "";
      if (codeTag && prefix) {
        findByCode({
          tag: codeTag,
          prefix: prefix,
        }).then((res) => {
          if (res.msg) {
            code = res.msg;
          }
          getCommonId().then(({ data }) => {
            if (data && data.id) {
              id = data.id;
              resolve({ code, id });
            }
          });
        });
      } else {
        getCommonId().then(({ data }) => {
          if (data && data.id) {
            id = data.id;
            resolve({ id });
          }
        });
      }
    });
  },
};

module.exports = {
  getCodeAndId: fetch.getCodeAndId,
};
