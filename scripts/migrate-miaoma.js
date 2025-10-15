const fs = require('fs')
const path = require('path')

// 递归获取所有文件
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      // 跳过 node_modules 和 dist
      if (!file.includes('node_modules') && !file.includes('dist') && !file.includes('pnpm-lock')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
      }
    } else {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
}

// 删除版权信息
function removeCopyright(content) {
  // 匹配文件开头的版权信息块
  const copyrightPattern = /^\/\*\s*\n\s*\*\s*Copyright.*?\*\/\s*\n/s
  return content.replace(copyrightPattern, '')
}

// 替换命名
function replaceNames(content) {
  let result = content

  // 替换中文
  result = result.replace(/妙码学院企业级监控平台/g, 'Sky-Monitor 监控平台')
  result = result.replace(/妙码学院/g, 'Sky Monitor')
  result = result.replace(/妙码/g, 'Sky')

  // 替换英文命名
  result = result.replace(/@miaoma\//g, '@sky-monitor/')
  result = result.replace(/miaoma-monitor/g, 'sky-monitor')
  result = result.replace(/miaoma/g, 'sky')
  result = result.replace(/MiaoMa/g, 'Sky')
  result = result.replace(/MIAOMA/g, 'SKY')

  // 替换作者
  result = result.replace(/Heyi/g, '')
  result = result.replace(/MIAOMAEDU/g, 'MIT')

  return result
}

// 处理单个文件
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    let newContent = content

    // 删除版权信息
    newContent = removeCopyright(newContent)

    // 替换命名
    newContent = replaceNames(newContent)

    // 只有内容变化时才写入
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8')
      console.log(`✅ 处理: ${filePath}`)
      return true
    }
    return false
  } catch (error) {
    console.error(`❌ 错误处理 ${filePath}:`, error.message)
    return false
  }
}

// 主函数
function main() {
  const backendDir = path.join(process.cwd(), 'apps', 'backend_')

  console.log('开始批量处理文件...\n')
  console.log(`目标目录: ${backendDir}\n`)

  // 获取所有文件
  const allFiles = getAllFiles(backendDir)

  // 过滤出需要处理的文件类型
  const filesToProcess = allFiles.filter(file => {
    const ext = path.extname(file)
    return ['.ts', '.js', '.json', '.md', '.yml', '.yaml', '.pug'].includes(ext)
  })

  console.log(`共找到 ${filesToProcess.length} 个文件需要处理\n`)

  let processedCount = 0
  filesToProcess.forEach(file => {
    if (processFile(file)) {
      processedCount++
    }
  })

  console.log(`\n✨ 完成！共处理了 ${processedCount} 个文件`)
}

main()

