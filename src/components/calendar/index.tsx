import { Text } from "react-native";
import {
  Calendar as CalendarComponent,
  LocaleConfig,
  DateData,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { ptBR } from "./locales";

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps { 
  [key: string]: { 
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean; 
  }
}

type DayProps = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
}
interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (DateData: DateData) => void;
}

function Calendar({ onDayPress, markedDates }: CalendarProps) {
  const theme = useTheme();

  return (
    <CalendarComponent
      firstDay={1}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
      minDate={String(new Date())}
      renderArrow={(direction) => (
        <Feather
          name={direction === "left" ? "chevron-left" : "chevron-right"}
          size={20}
          color={theme.colors.text}
        />
      )}
      headerStyle={{
        borderBottomColor: theme.colors.line,
        borderBottomWidth: 1,
      }}
    theme={{ 
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        textDayHeaderFontFamily: theme.fonts.secondary_600,
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontSize: 12, 
        textDayFontSize: 15,
    }}
    />
  );
}

export {
  Calendar,
  DayProps,
  MarkedDateProps,
}