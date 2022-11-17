import {Title, Container} from './styles';

import {RectButtonProps} from 'react-native-gesture-handler';
import { Loading } from '../Loading';
import { useTheme } from 'styled-components';

interface Button extends RectButtonProps {
    color?: string;
    title: string;
    enabled?: boolean;
    isLoading?: boolean;
    mt?:number;
    colorTitle?: string
}

export function Button({color, title, enabled=true, isLoading=false, mt=25, colorTitle, ...rest}: Button){
    const theme = useTheme();
    return (
        <Container {...rest} color={color} enabled={enabled} mt={mt} style={{opacity: !enabled ? 0.6 : 1}}>
            <Title colorTitle={colorTitle}>
                {isLoading ? <Loading  size='small' color={theme.colors.background_secondary}/> :  title}
            </Title>
        </Container>
    )
}