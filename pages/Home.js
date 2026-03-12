import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {

    //menghitung otomatis Present & Absent dari array history
    const totalPresent = history.filter(item => item.status === "Present").length;
    const totalAbsent = history.filter(item => item.status === "Absent").length;

    const renderItem = ({ item }) => (
        <View style={styles.Item}>
            <View>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            //menambah icon di sebelah status
            <View style={styles.statusRow}>
                <MaterialIcons
                    name={item.status === "Present" ? "check-circle" : "cancel"}
                    size={16}
                    color={item.status === "Present" ? "green" : "red"}
                />
                <Text style={item.status === "Present" ? styles.present : styles.absent}>
                    {" "}{item.status}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contents}>
                <Text style={styles.title}>Attendance App</Text>

                //mengubah isi data diri dengan data diri sendiri
                <View style={styles.card}>
                    <View style={styles.icon}>
                        <MaterialIcons name="person" size={40} color="#555"/>
                    </View>
                    <View>
                        <Text style={styles.name}>Natasha Padma Kinanti</Text>
                        <Text>NIM : 0320240051</Text>
                        <Text>Class : Manajemen Informatika-2A</Text>
                    </View>
                </View>

                <View style={styles.ClassCard}>
                    <Text style={styles.subtitle}>Today's Class</Text>
                    <Text>Mobile Programming</Text>
                    <Text>08:00 - 10:00</Text>
                    <Text>Lab 3</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>CHECK IN</Text>
                    </TouchableOpacity>
                </View>

                //menambah Section Upcoming Class
                <View style={styles.ClassCard}>
                    <Text style={styles.subtitle}>Upcoming Class</Text>
                    <Text>Database System</Text>
                    <Text>10:00 - 12:00</Text>
                    <Text>Ruang 201</Text>
                </View>

                //menambah Section Attendance Summary
                <View style={styles.summaryCard}>
                    <Text style={styles.subtitle}>Attendance Summary</Text>
                    <View style={styles.summaryRow}>
                        <MaterialIcons name="check-circle" size={18} color="green" />
                        <Text style={styles.present}> Present : {totalPresent}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <MaterialIcons name="cancel" size={18} color="red" />
                        <Text style={styles.absent}> Absent  : {totalAbsent}</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>Attendance History</Text>
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

//menambah 20 data
const history = [
    { id: "1",  course: "Mobile Programming",  date: "2026-03-01", status: "Present" },
    { id: "2",  course: "Database System",      date: "2026-03-02", status: "Present" },
    { id: "3",  course: "Operating Systems",    date: "2026-03-03", status: "Absent"  },
    { id: "4",  course: "Computer Network",     date: "2026-03-04", status: "Present" },
    { id: "5",  course: "Mobile Programming",   date: "2026-03-05", status: "Present" },
    { id: "6",  course: "Database System",      date: "2026-03-06", status: "Absent"  },
    { id: "7",  course: "Operating Systems",    date: "2026-03-07", status: "Present" },
    { id: "8",  course: "Computer Network",     date: "2026-03-08", status: "Present" },
    { id: "9",  course: "Mobile Programming",   date: "2026-03-09", status: "Absent"  },
    { id: "10", course: "Database System",      date: "2026-03-10", status: "Present" },
    { id: "11", course: "Operating Systems",    date: "2026-03-11", status: "Present" },
    { id: "12", course: "Computer Network",     date: "2026-03-12", status: "Absent"  },
    { id: "13", course: "Mobile Programming",   date: "2026-03-13", status: "Present" },
    { id: "14", course: "Database System",      date: "2026-03-14", status: "Present" },
    { id: "15", course: "Operating Systems",    date: "2026-03-15", status: "Present" },
    { id: "16", course: "Computer Network",     date: "2026-03-16", status: "Absent"  },
    { id: "17", course: "Mobile Programming",   date: "2026-03-17", status: "Present" },
    { id: "18", course: "Database System",      date: "2026-03-18", status: "Present" },
    { id: "19", course: "Operating Systems",    date: "2026-03-19", status: "Absent"  },
    { id: "20", course: "Computer Network",     date: "2026-03-20", status: "Present" },
    { id: "21", course: "Mobile Programming",   date: "2026-03-21", status: "Present" },
    { id: "22", course: "Database System",      date: "2026-03-22", status: "Present" },
    { id: "23", course: "Operating Systems",    date: "2026-03-23", status: "Absent"  },
    { id: "24", course: "Computer Network",     date: "2026-03-24", status: "Present" },
];

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    card: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15
    },
    name: {
        fontSize: 18,
        fontWeight: "bold"
    },
    ClassCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    button: {
        marginTop: 10,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
    },
    Item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8
    },
    course: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
        color: "gray"
    },
    present: {
        color: "green",
        fontWeight: "bold"
    },
    absent: {
        color: "red",
        fontWeight: "bold"
    },

    //menambah style baru untuk status row dan summary card
    statusRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    summaryCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
});