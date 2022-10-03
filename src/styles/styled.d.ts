import 'styled-components'
import { theme } from './theme'

type ThemeDefault = typeof theme;

declare module 'styled-components'{
    export interface DefaultTheme extends ThemeDefault{} 
}