import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './DoiTuongScreenStyleSheet';
// import nganhXetTuyenData from './NganhXetTuyen.json';
import toHopMonData from './ToHopMon.json'
const DoiTuong2Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {
    const [chuongTrinhIndex, setChuongTrinhIndex] = useState(0);
    const [nganhIndex, setNganhIndex] = useState(0);
    const [toHopIndex, setToHopIndex] = useState(0);

    const chuongTrinh = toHopMonData[chuongTrinhIndex] || {};
    const nganhList = chuongTrinh.nganh || [];
    const selectedNganh = nganhList[nganhIndex] || {};
    const toHopList = selectedNganh.toHopXetTuyen || [];
    const selectedToHop = toHopList[toHopIndex] || { monChinh: [], monTuChon: [] };

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({ ...prev, [index]: value }));
    };

    useEffect(() => {
        setDATA_DiemHocLuc(null);
        handleUpdateDATA('doiTuong', 2);
    }, []);

    const monBatBuoc = selectedToHop.monChinh || [];
    const monTuChon = selectedToHop.monTuChon || [];
    const monTatCa = [...monBatBuoc, ...monTuChon];
=======
import { Text, View, ScrollView, TextInput, TouchableOpacity, } from 'react-native';
import { Picker } from "@react-native-picker/picker"

import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';
import nganhXetTuyenData from './NganhXetTuyen.json';

const DoiTuong2Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            [index]: value,
        }));
    };

    useEffect(() => {
        setDATA_DiemHocLuc(null)
        handleUpdateDATA('doiTuong', 2)
    }, []);

    const nganhXetTuyen = nganhXetTuyenData;
    const toHopMon = toHopMonData;

    const [nganh, setNganh] = useState(null);

    let monBatBuoc_List = [];
    let monTuChon_List = [];
    let monTatCa_List = [];

    function layDanhSachMon(nganh) {
        if (!nganh) return [];
        const toHopMon_List = nganh.toHopMon.split(' - ');
        const temp_mon_List = toHopMon_List.flatMap(id =>
            toHopMon[id] || []
        );
        const mon_List = [...new Set(temp_mon_List)];
        monTatCa_List = mon_List;
        monBatBuoc_List = mon_List.slice(0, 2);
        monTuChon_List = mon_List.slice(2);

        return mon_List;
    }
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
<<<<<<< HEAD

=======
                        {'Thí sinh KHÔNG CÓ kết quả thi\nĐánh giá Năng lực ĐHQG-HCM năm 2025'}
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f
                    </Text>
                </View>

                <View style={styles.body}>
<<<<<<< HEAD
                    {/* Chọn Chương Trình */}
                    <Text style={styles.inputFieldTitle}>Chương Trình</Text>
                    <Picker
                        selectedValue={chuongTrinhIndex}
                        onValueChange={(value) => {
                            setChuongTrinhIndex(value);
                            setNganhIndex(0);
                            setToHopIndex(0);
                        }}
                    >
                        {toHopMonData.map((ct, idx) => (
                            <Picker.Item key={`ct-${idx}`} label={ct.chuongtrinh} value={idx} />
                        ))}
                    </Picker>

                    {/* Chọn Ngành */}
                    <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>
                    <Picker
                        selectedValue={nganhIndex}
                        onValueChange={(value) => {
                            setNganhIndex(value);
                            setToHopIndex(0);
                        }}
                    >
                        {nganhList.map((n, idx) => (
                            <Picker.Item key={`nganh-${n.maNganh}-${idx}`} label={`${n.maNganh} - ${n.tenNganh}`} value={idx} />
                        ))}
                    </Picker>

                    {/* Chọn Tổ Hợp Môn */}
                    <Text style={styles.inputFieldTitle}>Tổ hợp môn xét tuyển</Text>
                    <Picker
                        selectedValue={toHopIndex}
                        onValueChange={(value) => setToHopIndex(value)}
                    >
                        {toHopList.map((th, idx) => (
                            <Picker.Item key={`tohop-${chuongTrinhIndex}-${nganhIndex}-${idx}`} label={th.monChinh.join(' + ')} value={idx} />
                        ))}
                    </Picker>

                    {/* Nhập điểm cho môn chính */}
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.inputFieldTitle}>Điểm các môn chính</Text>
                        {monBatBuoc.map((mon, idx) => (
                            <View key={`monchinh-${mon}-${idx}`} style={styles.inputFieldRow}>
                                <Text style={[styles.inputFieldInputLabel, { flex: 1 }]}>{mon} *</Text>
                                <TextInput
                                    style={[styles.inputFieldInput, { flex: 1 }]}
                                    placeholder="00.00"
                                    placeholderTextColor="#969696"
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleUpdateDATA(`diemThi_${mon}`, parseFloat(text))}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Nhập điểm cho môn tự chọn */}
                    {monTuChon.length > 0 && (
                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.inputFieldTitle}>Điểm các môn tự chọn</Text>
                            {monTuChon.map((mon, idx) => (
                                <View key={`montuchon-${mon}-${idx}`} style={styles.inputFieldRow}>
                                    <Text style={[styles.inputFieldInputLabel, { flex: 1 }]}>{mon}</Text>
                                    <TextInput
                                        style={[styles.inputFieldInput, { flex: 1 }]}
                                        placeholder="00.00"
                                        placeholderTextColor="#969696"
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleUpdateDATA(`diemThi_${mon}_TC`, parseFloat(text))}
                                    />
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Nhập điểm THPT 10, 11, 12 cho các môn trong tổ hợp */}
                    {monTatCa.length > 0 && (
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.inputFieldRow}>
                                <Text style={[styles.inputFieldTitle, { flex: 3 }]}>Điểm Học THPT</Text>
                                {[10, 11, 12].map((lop) => (
                                    <Text key={`label-lop-${lop}`} style={[styles.inputFieldTableLabel, { flex: 1 }]}>{lop}</Text>
                                ))}
                            </View>
                            {monTatCa.map((mon) => (
                                <View key={`diemTHPT-${mon}`} style={styles.inputFieldRow}>
                                    <Text style={[styles.inputFieldInputLabel, { flex: 3 }]}>{mon}</Text>
                                    {[10, 11, 12].map((lop) => (
                                        <TextInput
                                            key={`diem_${mon}_${lop}`}
                                            style={[styles.inputFieldInput, { flex: 1 }]}
                                            placeholder="00.00"
                                            placeholderTextColor="#969696"
                                            keyboardType="numeric"
                                            onChangeText={(text) => handleUpdateDATA(`diemTB_${mon}_${lop}`, parseFloat(text))}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default DoiTuong2Screen;
=======
                    <View style={styles.inputField}>
                        <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>

                        <Picker
                            selectedValue={nganh}
                            onValueChange={(item) => {
                                handleUpdateDATA("danhSachMon", layDanhSachMon(item))
                                handleUpdateDATA("danhSachToHopMon", item.toHopMon)
                                setNganh(item)
                            }}
                            style={[styles.inputFieldInput, {
                                height: 50,
                                width: '100%',
                                marginLeft: 0,
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
                                    <Text style={{ fontWeight: 'bold', fontSize: 17}}>{nganh.toHopMon}</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Các môn khả dụng:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15}}>{layDanhSachMon(nganh).join(" - ")}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    {
                        nganh == null ? null :
                            <View style = {{width: '100%'}}>
                                <View style={styles.inputField}>
                                    <Text style={styles.inputFieldTitle}>Điểm Năng Lực</Text>
                                    <View style={styles.staticField}>
                                        <Text style={styles.staticFieldText}>
                                            {'= [ Điểm Tốt Nghiệp THPT ] x 0.75'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.inputField}>
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
                                    {monTuChon_List?.map((Mon, index) => (
                                        <View key={`Mon-${index}`} style={styles.inputFieldRow}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: 1 }]}>Điểm Thi {Mon}</Text>
                                            <TextInput
                                                style={[styles.inputFieldInput, { flex: 1 }]}
                                                placeholder="00.00"
                                                placeholderTextColor="#969696"
                                                keyboardType="numeric"
                                                onChangeText={(text) => handleUpdateDATA(`diemThi_${Mon}_TC`, parseFloat(text))}
                                            />
                                        </View>
                                    ))}
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
            </View>
        </ScrollView>
    )
};

export default DoiTuong2Screen;
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f
