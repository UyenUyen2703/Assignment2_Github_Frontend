<<<<<<< HEAD
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
=======
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Picker } from "@react-native-picker/picker"
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f

import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';
<<<<<<< HEAD

const DoiTuong6Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {
    const [chuongTrinhHoc, setChuongTrinhHoc] = useState(0);
    const [nganh, setNganh] = useState(0);
    const [toHopXetTuyen, setToHopXetTuyen] = useState(0);

    const chuongTrinhList = toHopMonData[chuongTrinhHoc] || {};
    // console.log("chuongTrinhList", chuongTrinhList);
    const nganhList = chuongTrinhList.nganh || [];
    const selectedNganh = nganhList[nganh] || {};
    const toHopXetTuyenList = selectedNganh.toHopXetTuyen ? selectedNganh.toHopXetTuyen : [];
    const selectToHop = toHopXetTuyenList?.[toHopXetTuyen] || { monChinh: [], monTuChon: [] };



    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({ ...prev, [index]: value }));
    };

    useEffect(() => {
        setDATA_DiemHocLuc(null);
        handleUpdateDATA('doituong', 6);
    }, []);

    const monBatBuoc = selectToHop.monChinh || [];
    console.log("monBatBuoc", monBatBuoc);

    const monTuChon = selectToHop.monTuChon || [];
    console.log("monTuChon", monTuChon);

    const tatCaMon = [...new Set([...monBatBuoc, ...monTuChon])];
    console.log("tatCaMon", tatCaMon);

=======
import nganhXetTuyenData from './NganhXetTuyen.json';

const DoiTuong6Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            [index]: value,
        }));
    };
 
    useEffect(() => {
        setDATA_DiemHocLuc(null)
        handleUpdateDATA('doiTuong', 6)
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
                    <Text style={styles.titleText}>{'Thí Sinh Tốt Nghiệp THPT Việt Nam'}</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.inputField}>
<<<<<<< HEAD
                        {/* Chương trình học */}
                        <Text style={styles.inputFieldTitle}>Chương Trình Học</Text>

                        <Picker
                            selectedValue={chuongTrinhHoc}
                            onValueChange={(item) => {
                                handleUpdateDATA(item)
                                setChuongTrinhHoc(item);
                                setNganh(0);
                                setToHopXetTuyen(0);

                            }} style={{ width: '100%' }}>
                            <Picker.Item label="-- Chọn chương trình học --" value={0} />
                            {toHopMonData.map((item, idx) => (
                                <Picker.Item
                                    key={idx}
                                    label={item.chuongtrinh}
                                    value={idx}
                                />
                            ))}
                        </Picker>

                        <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>
                        <Picker
                            selectedValue={nganh}
                            onValueChange={(item) => {
                                setNganh(item);
                                setToHopXetTuyen(0);
=======
                        <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>

                        <Picker
                            selectedValue={nganh}
                            onValueChange={(item) => {
                                handleUpdateDATA("danhSachMon", layDanhSachMon(item))
                                handleUpdateDATA("danhSachToHopMon", item.toHopMon)
                                setNganh(item)
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f
                            }}
                            style={[styles.inputFieldInput, {
                                height: 50,
                                width: '100%',
                                marginLeft: 0,
                            }]}
                            dropdownIconColor="#333"
                        >
<<<<<<< HEAD
                            <Picker.Item label="-- Chọn mã ngành --" value={0} />

                            {nganhList.map((item, idx) => (
                                <Picker.Item key={`nganh-${item.maNganh}-${idx}`} label={`${item.maNganh} - ${item.tenNganh}`} value={idx} />

=======
                            <Picker.Item label="-- Chọn mã ngành --" value={null} />

                            {nganhXetTuyen.map((item) => (
                                <Picker.Item
                                    key={item.id}
                                    label={`${item.id} - ${item.nganh}`}
                                    value={item}
                                />
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f
                            ))}

                        </Picker>

<<<<<<< HEAD
                        {/* Chọn tổ hợp môn xét tuyển */}
                        <Text style={styles.inputFieldTitle}>Tổ Hợp Môn Xét Tuyển</Text>
                        <Picker
                            selectedValue={toHopXetTuyen}
                            onValueChange={(item) => {
                                setToHopXetTuyen(item);
                            }}
                            style={[styles.inputFieldInput, {
                                height: 50,
                                width: '100%',
                                marginLeft: 0,
                            }]}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="-- Chọn tổ hợp môn --" value={null} />
                            {toHopXetTuyenList.map((item, idx) => (
                                <Picker.Item key={`tohop-${chuongTrinhHoc}-${nganh}-${idx}`} label={item.monChinh.join(' + ')} value={idx} />
                            ))}

                        </Picker>

                    </View>
                    {/* Nhập điểm cho các môn chính */}
                    <View style={{ width: '100%', marginTop: 15 }}>
                        {monBatBuoc.map((mon, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ width: 120 }}>{mon} *</Text>
                                <TextInput
                                    style={[styles.inputFieldInput, { flex: 1 }]}
                                    placeholder="Nhập điểm"
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleUpdateDATA(`diemThi_${mon}`, parseFloat(text))}
                                />
                            </View>
                        ))}
                    </View>
                    {/* Nhập điểm môn tự chọn */}
                    <View style={{ width: '100%', marginTop: 15 }}>
                        {monTuChon.map((mon, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ width: 120 }}>{mon} *</Text>
                                <TextInput
                                    style={[styles.inputFieldInput, { flex: 1 }]}
                                    placeholder="Nhập điểm"
                                    keyboardType="numeric"
                                    // value={diem[mon]}
                                    onChangeText={(text) => handleUpdateDATA(`diemThi_${mon}`, parseFloat(text))}
                                />
                            </View>
                        ))}
                    </View>

                    {/* <View style={{ width: '100%', marginTop: 15 }}>
                        <Text style={styles.inputFieldTitle}>Điểm Trung Bình</Text>
                        <Text style={styles.inputFieldInput}>{tinhDiemTrungBinh()}</Text>
                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <Text style={styles.inputFieldTitle}>Điểm Cao Nhất</Text>
                        <Text style={styles.inputFieldInput}>{tinhDiemCaoNhat()}</Text>
                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <Text style={styles.inputFieldTitle}>Điểm Thấp Nhất</Text>
                        <Text style={styles.inputFieldInput}>{tinhDiemThapNhat()}</Text>
                    </View> */}

                    {/* Tất cả môn */}
                    {tatCaMon.length > 0 && (
                        <View style={styles.inputField}>
                            <View style={styles.inputFieldRow}>
                                <Text style={[styles.inputFieldTitle, { flex: 3 }]}>Điểm Học THPT</Text>
                                {[10, 11, 12].map((lop) => (
                                    <Text key={`label-lop-${lop}`} style={[styles.inputFieldTableLabel, { flex: 1 }]}>{lop}</Text>
                                ))}
                            </View>
                            {tatCaMon.map((mon) => (
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
=======
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
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f

                </View>
            </View>
        </ScrollView>
    )
};

export default DoiTuong6Screen;