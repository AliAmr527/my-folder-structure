const fs = require("fs")
const path = require("path")

// Define the folder and file structure in a configuration object
const structure = {
	config: {
    files:[".env"]
  },
  db:{
    models:{},
    files:["connection.js"]
  },
	src: {
    middleware:{
      files:["auth.js","validation.js"]
    },
		modules: {
			user:{
        files:["user.controller.js","user.router.js","user.validation.js"]
      }
		},
    utils:{},
    files:["index.router.js"]
	},
	files:["index.js",".gitignore"]
}

// Function to recursively create folders and files based on the structure
const createStructure = (basePath, config) => {
	Object.keys(config).forEach((key) => {
		if (key === "files") {
			// Handle files array separately (no folder creation here)
			config[key].forEach((file) => {
				const filePath = path.join(basePath, file)
				if (!fs.existsSync(filePath)) {
				}
			})
		} else {
			// Create folders for non-'files' keys
			const currentPath = path.join(basePath, key)
			if (!fs.existsSync(currentPath)) {
				fs.mkdirSync(currentPath, { recursive: true })
			}

			// Recursively create the structure within this folder
			createStructure(currentPath, config[key])
		}
	})
}

// Base directory for your package (typically __dirname)
const baseDir = __dirname
console.log("creating folder structure")
// Call the function to create the structure
createStructure(baseDir, structure)
