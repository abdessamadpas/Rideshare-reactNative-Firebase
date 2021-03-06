import React,{useEffect,useContext} from "react";
import { getFirestore } from 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import firestore from '../firebase-config'

import dbFirestore from '../firebase-config'

import app from '../firebase-config'
        
import { doc, setDoc, Timestamp,addDoc , collection , getDocs, QuerySnapshot} from "firebase/firestore"; 

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import {postsRef } from '../firebase-config'
 
import {initialCurrentLocation, categoryData, carpoolingData} from '../data'
import { logoutt } from "../constants/icons";

const HomeScreen = ({ navigation }) => {
    const {logout} = useContext(AuthContext);

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [carpoolings, setCarpoolings] = React.useState([])
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)
    const [test, setTest] = React.useState([])

    //* firestore app inisialize
   // const toref = firebase().fires```````tore().collection("posts")
// const test =()=>{
//     console.log('test for firestore tests ');
//     const docRef = doc(dbFirestore, "posts", "wewe");
//     const docSnap =  getDocs(docRef);
    
//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
// }  
const db = getFirestore();

useEffect(() => {
  //  console.log("wewe");
    console.log("home screeen",carpoolings);
    fetch()
// console.log("effect use",carpoolings)
//  fetch()
//console.log("tttttttttttttttt", carpoolings);

}, [])

// useEffect(() => {
//    // console.log("tttttttttdttttttt", test);

// }, [carpoolings])

const array = []
const fetch= async ()=>{
    const querySnapshot = await getDocs(collection(db, "posts"));
    //console.log("fetching test",querySnapshot) 
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

    //  console.log(doc.id, "  aleeee  => ", doc.data());
      
        //  setCarpoolings(...carpoolings, doc.data() )
       // console.log("store" , doc.data() );
        array.push(doc.data());
        //console.log(wewe);
       // setTest(...wewe, wewe)
      //  console.log("test in local",carpoolings);
    });
   setCarpoolings(array)
    console.log("arrayyyyyyyyy",array);
    //console.log(test);
}

 

//get collection datav
// useEffect(() => {
//  postsRef
//  .onSnapshot(  
//     QuerySnapshot=>{
//         const
//     }
//   )=>{

//  }
//     .then((snapshot)=> {
//     console.log(snapshot.docs.vh._document.ie.data)
//    })

// }, [])

  //  const users =  collection(dbFirestore,'posts');
  //const usersCollection = collection(dbFirestore,'posts');




   // console.log("weeeeewweee")},[])

  

    function onSelectCategory(category) {
        //console.log(users);
        //filter restaurant
     //   let carpoolingList = carpoolingData.filter(a => a.categories.includes(category.id))

       // setCarpoolings(carpoolingList)

       // setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, marginVertical:20 ,paddingVertical: 5 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.abdou}
                        resizeMode="contain"
                        style={{
                          marginLeft: -30,
                            width: 120,
                            height: 120
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={()=> logout()}
                >
                    <Image
                        source={icons.logoutt}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    // test function here
                    onPress={() =>{ onSelectCategory(item)
                        fetch()
                    }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Main</Text>
                <Text style={{ ...FONTS.h1 }}>Categories</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderCarpoolingList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() =>{
                   navigation.navigate("CarpoolingDetails", {
                    item,
                    currentLocation
                })
               
            }}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={{uri:item.postImg}}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{item.to}</Text>
                    </View>
                </View>

                {/* carpooling Info */}
                <Text style={{ ...FONTS.body2 }}>{item.description}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                       

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={carpoolings}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderCarpoolingList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flex: 1,
        backgroundColor: COLORS.lightGray1
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default HomeScreen