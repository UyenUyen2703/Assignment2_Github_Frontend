import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';

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



    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Thí Sinh Tốt Nghiệp THPT Việt Nam'}</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.inputField}>
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
                            }}
                            style={[styles.inputFieldInput, {
                                height: 50,
                                width: '100%',
                                marginLeft: 0,
                            }]}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="-- Chọn mã ngành --" value={0} />

                            {nganhList.map((item, idx) => (
                                <Picker.Item key={`nganh-${item.maNganh}-${idx}`} label={`${item.maNganh} - ${item.tenNganh}`} value={idx} />

                            ))}

                        </Picker>

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

                </View>
            </View>
        </ScrollView>
    )
};

export default DoiTuong6Screen;