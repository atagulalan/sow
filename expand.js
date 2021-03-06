const fs = require('fs')

module.exports = {
	expand: (settingsFile, inputFolder, outputFolder) => {
		const { numbers, spacing, fileIdentifier } = require(settingsFile)

		let regFI = fileIdentifier.map((el) => el.replace(/[<>*()?]/g, '\\$&'))
		let files = []
		let input = fs.readFileSync(Object.keys(numbers).join(' - ') + '.txt', 'utf8')
		let r = new RegExp('^' + regFI[0] + '(.*)' + regFI[1] + '$', 'gm')

		writeToFile = (file, content) => {
			let subFolder = file.split('/')
			subFolder.pop()
			subFolder = subFolder.join('/')
			fs.mkdirSync(outputFolder + '/' + subFolder, { recursive: true })
			fs.writeFileSync(outputFolder + '/' + file, content)
		}

		while ((a = r.exec(input)) !== null) {
			files.push(inputFolder + '/' + a[1])
			let content = input.substr(r.lastIndex, input.length - a.index)
			var match = new RegExp('^' + regFI[0] + '(.*)' + regFI[1] + '$', 'gm').exec(content)
			if (match) content = content.substr(0, match.index)
			let lines = content.split('\n')
			lines.splice(0, spacing[0])
			lines.splice(-spacing[1])
			content = lines.join('\n')
			writeToFile(a[1], content)
			lastIndex = r.lastIndex
		}
	}
}
