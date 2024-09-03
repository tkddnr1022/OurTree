import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    statusBar:{
        backgroundColor: 'white',
    },
    headerContainer: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    headerLogo: {
        fontSize: 40,
        color: "black"
    },
    headerIconsContainer: {
        marginLeft: 'auto',
        flexDirection: 'row'
    },
    headerIcons: {
        fontSize: 25,
        marginLeft: 25
    },
    tabIcons: {
        fontSize: 25
    }
});

const HomeHeader = () => {
    return (
        <View style={styles.statusBar}>
            <SafeAreaView>
            <View style={styles.headerContainer}>
                <MaterialIcons style={styles.headerLogo} name="school" />
                <View style={styles.headerIconsContainer}>
                    <Feather style={styles.headerIcons} name="search" />
                    <Feather style={styles.headerIcons} name="bell" />
                    <FontAwesome style={styles.headerIcons} name="user-circle" />
                </View>
            </View>
        </SafeAreaView>
        </View>
        
    );
}

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#242424',
            tabBarStyle: {
                height: 60
            },
            tabBarItemStyle: {
                marginVertical: 10
            },
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: '홈',
                    header: HomeHeader,
                    tabBarIcon: ({ color }) => <FontAwesome style={styles.tabIcons} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="timetable"
                options={{
                    title: '시간표',
                    tabBarIcon: ({ color }) => <FontAwesome style={styles.tabIcons} name="table" color={color} />,
                }}
            />
            <Tabs.Screen
                name="board"
                options={{
                    title: '게시판',
                    tabBarIcon: ({ color }) => <MaterialIcons style={styles.tabIcons} name="speaker-notes" color={color} />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: '채팅',
                    tabBarIcon: ({ color }) => <Entypo style={styles.tabIcons} name="chat" color={color} />,
                }}
            />
            <Tabs.Screen
                name="academy"
                options={{
                    title: '학원',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons style={styles.tabIcons} name="office-building-marker" color={color} />,
                }}
            />
        </Tabs>
    );
}
