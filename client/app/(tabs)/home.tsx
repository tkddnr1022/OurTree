import { Meal } from "@/interfaces/meal";
import { Schedule } from "@/interfaces/schedule";
import { School } from "@/interfaces/school";
import { formatMealName, formatScheduleDate } from "@/scripts/api/format";
import getMeal from "@/scripts/api/get-meal";
import getSchedule from "@/scripts/api/get-schedule";
import getSchool from "@/scripts/api/get-school";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Home() {
  // Todo: 데이터 캐싱
  // Todo: 요청 URL 환경변수로부터 불러오기
  // Todo: 데이터 요청 함수 단일화?
  const [school, setSchool] = useState<School | null>();
  const [schedule, setSchedule] = useState<Schedule[] | null>();
  const [meal, setMeal] = useState<Meal[] | null>();
  const [isLoading, setIsLoading] = useState(true);

  // 테스트용
  const school_code = "7003982";
  const ym = "202408";
  const date = "20240701";

  useEffect(() => {
    const fetchData = async () => {
      setSchool(await getSchool(school_code));
      setSchedule(await getSchedule(school_code, ym));
      setMeal(await getMeal(school_code, date));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{school && school.SCHUL_NM}</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>학사일정</Text>
          {isLoading ? (
            <Text>불러오는 중</Text>
          ) : (
            schedule && schedule.length ? (
              schedule.map((sch, index) => (
                <View key={index}>
                  <Text>{`${formatScheduleDate(sch.AA_YMD)} ${sch.EVENT_NM}`}</Text>
                </View>
              ))
            ) : (
              <Text>데이터가 없습니다.</Text>
            )
          )}
        </View>
      </View>
      <View style={styles.mealContainer}>
        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>급식표</Text>
          {isLoading ? (
            <Text>불러오는 중</Text>
          ) : (
            meal && meal.length ? (
              meal.map((m, index) => (
                <View key={index}>
                  <Text>{m.MMEAL_SC_NM}</Text>
                  <Text>{formatMealName(m.DDISH_NM)}</Text>
                </View>
              ))
            ) : (
              <Text>데이터가 없습니다.</Text>
            )
          )}
        </View>
      </View>
      <View style={{ flex: 10 }}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
  },
  header: {
    flex: 2,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    padding: 20,
  },
  cardHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  scheduleContainer: {
    flex: 6,
  },
  mealContainer: {
    flex: 10,
  },
});
