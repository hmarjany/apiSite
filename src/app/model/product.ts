export class Product {

    constructor() {

        this.uniqueObjectIdentifier = Symbol();
    }

    _id: any;
    uniqueObjectIdentifier: symbol;
    picture: string | undefined;
    category: any;
    categoryName: string | undefined;
    categoryType: any;
    categoryTypeName: string | undefined;
    subCategory: any;
    subCategoryName: string | undefined;
    imagePath: Array<string> | undefined;
    name: string | undefined;
    price: number | undefined;
    lastPrice: number | undefined;
    discountPrice: number | undefined;
    discountPercent: number | undefined;
    barnd: any | undefined;
    brandName: string | undefined;
    sale: Boolean | undefined;
    specialOffer: Boolean | undefined;
    sepcification: String | undefined;
    additinalInfos: Array<any> | undefined;
    size: Array<any> | undefined;
    comments: Array<Comment> | undefined;
    quantity: number | undefined;
    count: number = 1;
    skip?: number = 0;
    limit?: number = 0;
    isProductAvailable: boolean | undefined;
    viewCount: number | undefined;
    saleCount: number | undefined;
    createDate: Date | undefined;
    selectedSize: any;
    selectedSizeName: string | undefined;
    notExist = false;
    description: string | undefined;
}