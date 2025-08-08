import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Picker } from "@react-native-picker/picker"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';
import nganhXetTuyenData from './NganhXetTuyen.json';

const DoiTuong5Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            [index]: value,
        }));
    };

    useEffect(() => {
        setDATA_DiemHocLuc(null)
        handleUpdateDATA('doiTuong', 5)
        if (nganh != null) {
            handleUpdateDATA('danhSachToHopMon', nganh.toHopMon)
            handleUpdateDATA('danhSachMon', layDanhSachMon(nganh))
        }

    }, []);

    const nganhXetTuyen = nganhXetTuyenData;
    const toHopMon = toHopMonData;

    const [nganh, setNganh] = useState(null);

    let monBatBuoc_List = [];
    const [monTuChon_List, setMonTuChon_List] = useState([]);
    let monTatCa_List = [];

    const [monTuChon_List_Picked, setMonTuChon_List_Picked] = useState([]);

    const [diemTuChonModalVisible, setDiemTuChonModalVisible] = useState(false);
    const handleDiemTuChonList = (choice) => {
        setDiemTuChonModalVisible(false);
        setMonTuChon_List_Picked([...monTuChon_List_Picked, choice]);
        let newList = removeMonTuChonFromList(choice)
        setMonTuChon_List(newList)
    };

    function removeMonTuChonFromList(choice) {
        const index = monTuChon_List.indexOf(choice);
        if (index > -1) {
            monTuChon_List.splice(index, 1);
        }
        return monTuChon_List;
    }

    function removeMonTuChonFromList_Picked(choice) {
        const index = monTuChon_List_Picked.indexOf(choice);
        if (index > -1) {
            monTuChon_List_Picked.splice(index, 1);
        }
        return monTuChon_List_Picked;
    }

    function layDanhSachMon(nganh) {
        if (!nganh) return [];
        const toHopMon_List = nganh.toHopMon.split(' - ');
        const temp_mon_List = toHopMon_List.flatMap(id =>
            toHopMon[id] || []
        );
        const mon_List = [...new Set(temp_mon_List)];
        monTatCa_List = mon_List;
        monBatBuoc_List = mon_List.slice(0, 2);

        return mon_List;
    }

    const [TotNghiepTHPTChoice, setTotNghiepTHPTChoice] = useState(1);

    const [ChungChi, setChungChi] = useState(null);

    const [CCTA, setCCTA] = useState(null);

    const [ModalList, setModalList] = useState(null);

    const [ModalVisible, setModalVisible] = useState(false);

    const ChungChiList = ['SAT', 'ACT', 'IB', 'A-LEVEL'];

    const CCTAList = ['IELTS', 'TOEFL iBT'];

    const resetDiemTNTHPT = () => {
        // setDATA_DiemHocLuc('diemChungChiQuocTe', null)
        // setDATA_DiemHocLuc('chungChiQuocTe', null)
        // setDATA_DiemHocLuc('diemThi_Mon1', null)
        // setDATA_DiemHocLuc('diemThi_Mon2', null)
        // setDATA_DiemHocLuc('diemThi_Mon3', null)
    }

    const ModalOption1 = () =>
        <View style={styles.modalContent}>
            {ChungChiList.map((choice, index) => (
                <TouchableOpacity key={index} style={styles.choiceButton}
                    onPress={() => {
                        setModalVisible(false), setChungChi(choice)
                        handleUpdateDATA('chungChiQuocTe', choice)
                    }}>
                    <Text style={styles.choiceText}>{choice}</Text>
                </TouchableOpacity>
            ))}
        </View>

    const ModalOption2 = () =>
        <View style={styles.modalContent}>
            {CCTAList.map((choice, index) => (
                <TouchableOpacity key={index} style={styles.choiceButton}
                    onPress={() => {
                        setModalVisible(false), setCCTA(choice)
                        handleUpdateDATA('CCTA', choice)
                    }}>
                    <Text style={styles.choiceText}>{choice}</Text>
                </TouchableOpacity>
            ))}
        </View>

    const renderModalList = () => {
        switch (ModalList) {
            case 1:
                return <ModalOption1 />;
            case 2:
                return <ModalOption2 />;
            default:
                return;
        }
    }

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {'Thí Sinh Dự Tính Du Học Nước Ngoài,\nTheo Chương Trình Chuyển Tiếp Quốc Tế'}
                    </Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.inputField}>
                        <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>

                        <Picker
                            selectedValue={nganh}
                            onValueChange={(item) => {
                                handleUpdateDATA("danhSachMon", layDanhSachMon(item))
                                handleUpdateDATA("danhSachToHopMon", item.toHopMon)
                                setMonTuChon_List(layDanhSachMon(item).slice(2));
                                setNganh(item)
                            }}
                            style={[styles.inputFieldInput, {
                                height: 50,
                                width: '100%',
                                marginLeft: 0,
                                padding: 0,
                            }]}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="-- Chọn mã ngành --" value={null} />

                            {nganhXetTuyen.map((item) => (
                                <Picker.Item
                                    key={item.id}
                                    label={`${item.id} - ${item.nganh}`}
                                    value={item}
                                />
                            ))}

                        </Picker>

                        {nganh && (
                            <View style={{ width: '100%', marginTop: 15 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Tổ hợp môn xét tuyển:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{nganh.toHopMon}</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Các môn khả dụng:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{layDanhSachMon(nganh).join(" - ")}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    {
                        nganh == null ? null :
                            <View style={{ width: '100%' }}>
                                <View style={styles.inputField}>
                                    <Text style={styles.inputFieldTitle}>Điểm Năng Lực</Text>
                                    <View style={styles.inputFieldRow}>
                                        <Text style={styles.inputFieldInputLabel}>Điểm Phỏng Vấn</Text>
                                        <TextInput style={styles.inputFieldInput}
                                            placeholder='00.00'
                                            placeholderTextColor={'#969696ff'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => handleUpdateDATA('diemPhongVan', parseFloat(text))}
                                        />
                                    </View>
                                    <View style={styles.inputFieldRow}>
                                        <Text style={styles.inputFieldInputLabel}>Điểm Bài Luận</Text>
                                        <TextInput style={styles.inputFieldInput}
                                            placeholder='00.00'
                                            placeholderTextColor={'#969696ff'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => handleUpdateDATA('diemBaiLuan', parseFloat(text))}
                                        />
                                    </View>
                                    <View style={[styles.inputFieldRow]}>
                                        <Text style={[styles.inputFieldInputLabel, { flex: 2 }]}>Điểm CCTA</Text>
                                        <TextInput style={[styles.inputFieldInput, { flex: 1 }]}
                                            placeholder='00.00'
                                            placeholderTextColor={'#969696ff'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => handleUpdateDATA('diemCCTA', parseFloat(text))}
                                        />
                                        <TouchableOpacity style={[styles.inputFieldInput, { flex: 1 }]}
                                            onPress={() => { setModalVisible(true), setModalList(2) }}>
                                            <Text style={[styles.inputFieldPickerText, CCTA != null && { color: '#000000' }]}>
                                                {CCTA != null ? CCTA : '--'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.inputField}>
                                    <Text style={styles.inputFieldTitle}>Điểm Tốt Nghiệp THPT</Text>
                                    <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 12, }]}
                                        onPress={() => {
                                            setTotNghiepTHPTChoice(1)
                                            resetDiemTNTHPT()
                                        }}>
                                        <View style={[styles.radioButton, TotNghiepTHPTChoice == 1 && styles.radioButtonSelected]} />
                                        <Text style={[styles.radioText, TotNghiepTHPTChoice == 1 && styles.radioTextSelected]}>
                                            Thí sinh tốt nghiệp THPT Việt Nam
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 12, }]}
                                        onPress={() => {
                                            setTotNghiepTHPTChoice(2)
                                            resetDiemTNTHPT()
                                        }}>
                                        <View style={[styles.radioButton, TotNghiepTHPTChoice == 2 && styles.radioButtonSelected]} />
                                        <Text style={[styles.radioText, TotNghiepTHPTChoice == 2 && styles.radioTextSelected]}>
                                            {'Thí sinh tốt nghiệp THPT nước ngoài và\nCÓ chứng chỉ tuyển sinh quốc tế'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 16, }]}
                                        onPress={() => {
                                            setTotNghiepTHPTChoice(3)
                                            resetDiemTNTHPT()
                                        }}>
                                        <View style={[styles.radioButton, TotNghiepTHPTChoice == 3 && styles.radioButtonSelected]} />
                                        <Text style={[styles.radioText, TotNghiepTHPTChoice == 3 && styles.radioTextSelected]}>
                                            {'Thí sinh tốt nghiệp THPT nước ngoài và\nKHÔNG CÓ chứng chỉ tuyển sinh quốc tế'}
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        TotNghiepTHPTChoice == 1 ?
                                            <View style={{ width: '100%' }}>
                                                <Text style={styles.inputFieldTitle}>Điểm Tốt Nghiệp THPT</Text>
                                                {monBatBuoc_List?.map((Mon, index) => (
                                                    <View key={`Mon-${index}`} style={styles.inputFieldRow}>
                                                        <Text style={[styles.inputFieldInputLabel, { flex: 1 }]}>Điểm Thi {Mon} *</Text>
                                                        <TextInput
                                                            style={[styles.inputFieldInput, { flex: 1 }]}
                                                            placeholder="00.00"
                                                            placeholderTextColor="#969696"
                                                            keyboardType="numeric"
                                                            onChangeText={(text) => handleUpdateDATA(`diemThi_${Mon}`, parseFloat(text))}
                                                        />
                                                    </View>
                                                ))}
                                                {monTuChon_List_Picked?.map((Mon, index) => (
                                                    <View key={`Mon-${index}`} style={styles.inputFieldRow}>
                                                        <View style={[styles.inputFieldRow, { flex: 1, marginBottom: 0 }]}>
                                                            <Text style={[styles.inputFieldInputLabel]}>Điểm Thi {Mon}</Text>
                                                            <TouchableOpacity style={[styles.inputFieldInput,
                                                            { flex: 0, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }]}
                                                                onPress={() => {
                                                                    let newList = removeMonTuChonFromList_Picked(Mon)
                                                                    setMonTuChon_List_Picked(newList)
                                                                    setMonTuChon_List([...monTuChon_List, Mon]);
                                                                    if (`diemThi_${Mon}_TC` in DATA_DiemHocLuc) {
                                                                        delete DATA_DiemHocLuc[`diemThi_${Mon}_TC`]
                                                                        setDATA_DiemHocLuc(DATA_DiemHocLuc);
                                                                    }
                                                                }}>
                                                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                                                    <MaterialIcons name={'close'} size={20} color={'#a3a3a3ff'} />
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <TextInput
                                                            style={[styles.inputFieldInput, { flex: 1 }]}
                                                            placeholder="00.00"
                                                            placeholderTextColor="#969696"
                                                            keyboardType="numeric"
                                                            onChangeText={(text) => handleUpdateDATA(`diemThi_${Mon}_TC`, parseFloat(text))}
                                                        />
                                                    </View>
                                                ))}
                                                {
                                                    monTuChon_List.length == 0 ? null :
                                                        <View style={[styles.inputFieldRow, { marginTop: 10 }]}>
                                                            <TouchableOpacity style={[styles.inputFieldInput, { flex: 1, marginLeft: 0, justifyContent: 'center', alignItems: 'center' }]}
                                                                onPress={() => { setDiemTuChonModalVisible(true) }}>
                                                                <Text>Thêm Điểm Môn Tự Chọn</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                }
                                            </View>
                                            : TotNghiepTHPTChoice == 2 ?
                                                <View style={[styles.inputFieldRow]}>
                                                    <Text style={[styles.inputFieldInputLabel, { flex: 2 }]}>Điểm Chứng Chỉ</Text>
                                                    <TextInput style={[styles.inputFieldInput, { flex: 1 }]}
                                                        placeholder='00.00'
                                                        placeholderTextColor={'#969696ff'}
                                                        keyboardType="numeric"
                                                        onChangeText={(text) => handleUpdateDATA('diemChungChiQuocTe', parseFloat(text))}
                                                    />
                                                    <TouchableOpacity style={[styles.inputFieldInput, { flex: 1 }]}
                                                        onPress={() => { setModalVisible(true), setModalList(1) }}>
                                                        <Text style={[styles.inputFieldPickerText, ChungChi != null && { color: '#000000' }]}>
                                                            {ChungChi != null ? ChungChi : '--'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={styles.staticField}>
                                                    <Text style={styles.staticFieldText}>{'= [Điểm Học THPT]'}</Text>
                                                </View>

                                    }
                                </View>

                                <View style={styles.inputField}>
                                    <View style={styles.inputFieldRow}>
                                        <Text style={[styles.inputFieldTitle, { flex: 3, marginBottom: 5 }]}>Điểm Học THPT</Text>
                                        {[10, 11, 12].map((Mon, index) => (
                                            <Text key={`Lop-${index}`} style={[styles.inputFieldTableLabel, { flex: 1 }]}>{Mon}</Text>
                                        ))}
                                    </View>

                                    {monTatCa_List.map((mon) => (
                                        <View key={`diemTBLop-${mon}`} style={styles.inputFieldRow}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: 3 }]}>
                                                Điểm TB {mon}
                                            </Text>
                                            {
                                                [10, 11, 12].map((lop) => (
                                                    <TextInput
                                                        key={`diemMon_${mon}_${lop}`}
                                                        style={[styles.inputFieldInput, { flex: 1 }]}
                                                        placeholder="00.00"
                                                        placeholderTextColor="#969696"
                                                        keyboardType="numeric"
                                                        onChangeText={(text) => handleUpdateDATA(`diemTB_${mon}_${lop}`, parseFloat(text))}
                                                    />
                                                ))
                                            }
                                        </View>
                                    ))}

                                </View>
                            </View>
                    }
                </View>

                <Modal animationType="fade"
                    transparent={true}
                    visible={ModalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <Pressable style={styles.modalOverlay}
                        onPress={() => setModalVisible(false)}>
                        {renderModalList()}
                    </Pressable>
                </Modal>

                <Modal animationType="fade"
                    transparent={true}
                    visible={diemTuChonModalVisible}
                    onRequestClose={() => setDiemTuChonModalVisible(false)}>
                    <Pressable style={styles.modalOverlay}
                        onPress={() => setDiemTuChonModalVisible(false)}>
                        <View style={styles.modalContent}>
                            {monTuChon_List.map((choice, index) => (
                                <TouchableOpacity key={index}
                                    style={styles.choiceButton}
                                    onPress={() => { handleDiemTuChonList(choice) }}>
                                    <Text style={styles.choiceText}>{choice}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </ScrollView>
    )
};

export default DoiTuong5Screen;