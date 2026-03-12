import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { registerWebMCPTools } from './lib/webmcp'

const app = mount(App, {
  target: document.getElementById('app')!,
})

registerWebMCPTools()

export default app
