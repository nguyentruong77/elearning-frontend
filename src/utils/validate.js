const ERROR_MESSAGE = {
  required: "Please fill in this field",
  regexp: "Field not like format",
};

const REGEXP = {
  phone: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};

export const validate = (rules, forms) => {
  const errorObject = {};
  for (let name in rules) {
    for (let rule of rules[name]) {
      if (rule.required) {
        if (!forms[name]?.trim()) {
          errorObject[name] = rule.message || ERROR_MESSAGE.required;
        }
      }

      if (rule.regexp && forms[name]) {
        let regexp = rule.regexp;
        if (regexp in REGEXP) {
          regexp = REGEXP[regexp];
        } else if (!(regexp instanceof RegExp)) {
          regexp = new RegExp();
        }

        if (!regexp.test(forms[name])) {
          errorObject[name] = rule.message || ERROR_MESSAGE.regexp;
        }
      }
    }
  }

  return errorObject;
};

export const required = (message) => ({
  message,
  required: true,
});

export const regexp = (pattern, message) => ({
  regexp: pattern,
  message,
});
