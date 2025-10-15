import "./App.css"

import * as Dialog from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

import viteLogo from "/vite.svg"

import reactLogo from "./assets/react.svg"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8">
            <div className="bg-red-500">12123</div>
            <div className="max-w-4xl mx-auto text-center">
                {/* Header with logos */}
                <div className="flex justify-center gap-8 mb-8">
                    <a
                        href="https://vite.dev"
                        target="_blank"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
                    </a>
                    <a
                        href="https://react.dev"
                        target="_blank"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img src={reactLogo} className="h-24 w-24 animate-spin" alt="React logo" />
                    </a>
                </div>

                {/* Main content */}
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-8">
                    Vite + React + Tailwind + Radix UI
                </h1>

                {/* Counter card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
                    >
                        count is {count}
                    </button>
                    <p className="text-gray-600 dark:text-gray-300">
                        Edit{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            src/App.tsx
                        </code>{" "}
                        and save to test HMR
                    </p>
                </div>

                {/* Radix UI Components Demo */}
                <div className="space-y-4">
                    {/* Dialog Demo */}
                    <Dialog.Root>
                        <Dialog.Trigger className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mr-4">
                            打开对话框
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                                <Dialog.Title className="text-xl font-semibold mb-4">
                                    这是一个 Radix UI 对话框
                                </Dialog.Title>
                                <Dialog.Description className="text-gray-600 dark:text-gray-300 mb-4">
                                    这个对话框使用了 Radix UI 的无障碍功能。
                                </Dialog.Description>
                                <Dialog.Close className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                    关闭
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                    {/* Dropdown Menu Demo */}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                            下拉菜单
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 min-w-[200px]">
                                <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                                    选项 1
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                                    选项 2
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-600 my-1" />
                                <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                                    选项 3
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mt-8">
                    点击 Vite 和 React 标志了解更多
                </p>
            </div>
        </div>
    )
}

export default App
