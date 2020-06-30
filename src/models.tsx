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
    tag: string,
    show: boolean,
    total: number | null
}

export default Place;