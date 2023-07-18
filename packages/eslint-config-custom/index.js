module.exports = {
  parserOptions: { "ecmaVersion": 2020 },
  extends: ["airbnb", "prettier", "prettier/react"],
  rules: {
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100
      }
    ]
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx"]
      }
    },
    "import/core-modules": ["@expo/vector-icons"]
  },
  plugins: ["prettier"]
};
