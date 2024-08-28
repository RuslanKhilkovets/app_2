module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src/",
          "@images": "./assets/images",
          "@icons": "./assets/icons",
          "@constants": "./src/constants",
          "@validations": "./src/validations",
          "@components": "./src/components",
          "@types": "./src/types",
          "@screens": "./src/screens",
          "@helpers": "./src/helpers",
          "@contexts": "./src/contexts",
          "@navigation": "./src/navigation"
        }
      }
    ]
  ]
};
