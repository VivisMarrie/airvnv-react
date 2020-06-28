interface Place {
    id: number,
    photo: string,
    propertyType: string,
    name: string,
    price: number,
    priceCurrency: string,
    lat: number,
    lng: number,
    score: number,
    tag: string
}

export default Place;