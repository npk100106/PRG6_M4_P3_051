import React, { useState, useEffect } from "react";
import { 
    View, Text, SafeAreaView, StyleSheet, 
    TouchableOpacity, ScrollView, FlatList, Alert 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// LANGKAH 2: Pindahkan data statis ke luar atau gunakan sebagai initial state
const initialHistory = [
    { id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present" },
    { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
    { id: "3", course: "Operating Systems", date: "2026-03-03", status: "Absent" },
    { id: "4", course: "Computer Network", date: "2026-03-04", status: "Present" },
    { id: "5", course: "Mobile Programming", date: "2026-03-05", status: "Present" },
];

const Home = () => {
    // --- STATE MANAGEMENT ---
    const [historyData, setHistoryData] = useState(initialHistory);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    // LANGKAH 3: useEffect untuk Jam Real-time
    useEffect(() => {
        const timer = setInterval(() => {
            const timeString = new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(timer); // Cleanup
    }, []);

    // LANGKAH 4: Logika Tombol Check-In
    const handleCheckIn = () => {
        if (isCheckedIn) {
            Alert.alert("Perhatian", "Anda sudah melakukan Check In untuk kelas ini.");
            return;
        }

        const newAttendance = {
            id: Date.now().toString(),
            course: "Mobile Programming",
            date: new Date().toLocaleDateString('id-ID'),
            status: "Present"
        };

        setHistoryData([newAttendance, ...historyData]);
        setIsCheckedIn(true);
        Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
    };

    // Kalkulasi Summary
    const totalPresent = historyData.filter(item => item.status === "Present").length;
    const totalAbsent = historyData.filter(item => item.status === "Absent").length;

    const renderItem = ({ item }) => (
        <View style={styles.Item}>
            <View>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
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
                {/* LANGKAH 5: Header dengan Jam Digital */}
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Attendance App</Text>
                    <Text style={styles.clockText}>{currentTime}</Text>
                </View>

                {/* Data Diri */}
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

                {/* Today's Class & Check-in Button */}
                <View style={styles.ClassCard}>
                    <Text style={styles.subtitle}>Today's Class</Text>
                    <Text>Mobile Programming</Text>
                    <Text>08:00 - 10:00 | Lab 3</Text>
                    
                    <TouchableOpacity 
                        style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
                        onPress={handleCheckIn}
                        disabled={isCheckedIn}
                    >
                        <Text style={styles.buttonText}>
                            {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Attendance Summary */}
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
                    data={historyData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    contents: { padding: 20 },
    headerRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    title: { fontSize: 24, fontWeight: "bold" },
    clockText: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#007AFF',
        fontVariant: ['tabular-nums'] 
    },
    card: { flexDirection: "row", backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
    icon: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#eee", alignItems: "center", justifyContent: "center", marginRight: 15 },
    name: { fontSize: 18, fontWeight: "bold" },
    ClassCard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
    subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    button: { marginTop: 10, padding: 12, borderRadius: 8, alignItems: "center" },
    buttonActive: { backgroundColor: "#007AFF" },
    buttonDisabled: { backgroundColor: "#A0C4FF" },
    buttonText: { color: "white", fontWeight: "bold" },
    Item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 8 },
    course: { fontSize: 16 },
    date: { fontSize: 12, color: "gray" },
    present: { color: "green", fontWeight: "bold" },
    absent: { color: "red", fontWeight: "bold" },
    statusRow: { flexDirection: "row", alignItems: "center" },
    summaryCard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
    summaryRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
});

export default Home;