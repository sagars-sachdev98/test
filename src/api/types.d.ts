export interface IAdminsRoleData {
  id: number
  enabled: boolean
  name: string
}

export interface ICategoryData{
  
}

export interface IForwardData{
  id: number | null;
  enabled: boolean | null;
  date: string | null;
  accountId: string | null;
  supplierId: string | null;
  cdays: number | null;
  cdate: string | null;
  customerId:string | null;
  millId: string | null;
  count: number | null;
  pkg: number | null;
  type: string | null;
  rate: number | null;
  qty: number | null;
  amount: number | null;
}

export interface ICareerData{
  id: number;
  postTitle:string;
 location: string;
}
export interface IClaimData{
id:number | null;
enabled:boolean;
userId:number | null;
bankId:number | null;
amount:number | null;
status:number | null;

}

export interface IGameData{
  id:number
  enabled:boolean
  userId:number | null
  winnerId:number
  prizeAmount:number
  numberOfParticipants:number
  noOfParticipantsPaid:number | null
  totalAmountCollected:number | null
  gameCode:string
  claimed:boolean
  status:number | null
  perPersonAmount:number 
  winnerCount:number | null
  // winner_1:number | null
  // winner_2:number | null
  // winner_3:number | null
  // winner_1_id:number | null
  // winner_2_id:number | null
  // winner_3_id:number | null
  isRealMoney: boolean
  
  }

export interface IBankData{
id:number | null;
userId:number | null;
bankAccountNumber:string;
ifscCode:number | null;
bankName:string | null;
branchName:string | null;
bankCustomerName:string | null;
createdTimestamp?:	string | null
createdBy?:	number | null
    }
  

export interface IPurchaseSalesData{
  id: number;
  enabled: boolean;
  dono: string;
  invoiceNo: string;
  enteryDate: string;
  date: string;
  accountId: string;
  supplierId: string;
  cdays: number;
  cdate: string;
  customerId: '';
  millId: string;
  count: number;
  pkg: number;
  type: string;
  rate: number;
  qty: number;
  amount: number;
  payments: IPayments[];
  balance:number;
}
export interface IPayments{
id:number;
date:string;
amount:string;
}

export interface IGameTransactionData{
  id:number;
  userId:	number
  gameId:	number
  prizeId:	number
  status:	string
  }

export interface IMillData {
  id: number
  enabled: boolean
  name: string
  code: string
  percentage: number;
}

export interface IOwnerData {
  id: number
  enabled: boolean
  name: string,
  contact: string
}

export interface IAccountBookData {
  id: number
  enabled: boolean
  name: string
  code: string
}

export interface IAdminData {
  id: number
  enabled: boolean
  fullName: string
  email: string
  contactNumber: string
  password: string | null
  avatar: string
  gender: string
  adminsRoleId: number
}

export interface ICountryData {
  id: number
  enabled: boolean
  name: string
  code: string
  zipCodeMinLength: number
  zipCodeMaxLength: number
}

export interface IStateData {
  id: number
  enabled: boolean
  name: string
  countryId: number | undefined,
  country: {
    id: number | undefined
  }
}

export interface ICityData {
  id: number
  enabled: boolean
  name: string
  stateId: number | undefined
  countryId: number | undefined
  country: {
    id: number | undefined
  }
  state: {
    id: number | undefined
  }
}

export interface IUsersRoleData {
  id: number
  enabled: boolean
  name: string
}

export interface IUserData {
  id: number
  enabled: boolean
  fullName: string
  email: string
  contactNumber: string
  password: string
  realMoney:number
  fakeMoney:number
  numberOfGamesWon:number
  numberOfPrizesWon:number
  pushId: string;
  device: string;
  deviceId: string;
  platform: string;
  OSVersion: string;
  uuid: string;
  model: string;
  manufacturer: string;
  appVersion: string;
  createdBy: number;
  createdTimestamp?: string;
  updatedBy?: number;
  updatedTimestamp?: string;
  pushUpdatedTimestamp?: string;
}

export interface IAmenityData {
  id: number
  enabled: boolean
  name: string
  icon: string
}

// export interface ICategoryData {
//   id: number
//   enabled: boolean
//   name: string
//   icon: string
//   markerIcon: string
// }

export interface IBusinessData {
  id: number
  enabled: boolean
  name: string
}

// export interface IBrandData {
//   id: number
//   enabled: boolean
//   name: string
// }

export interface ICompanyData {
  id: number
  enabled: boolean
  name: string
}

export interface ISiteData {
  id: number
  enabled: boolean
  name: string
  companyId: number | undefined
  company: {
    id: number | undefined
  }
}

export interface ILocationData {
  id: number
  enabled: boolean
  contactNumber1: string | null
  contactNumber2: string | null
  address: string | null
  spocName: string | null
  spocEmail: string | null
  spocContactNumber: string | null
  coordinate: string | null
  pincode: string | null
  hotDesking: string | null
  externalLink: string | null
  siteId: number | null
  site: {
    id: number | null
  }
  companyId: number | null
  company: {
    id: number | null
  }
  businessId: number | null
  business: {
    id: number | null
  }
  brandId: number | null
  brand: {
    id: number | null
  }
  categoryId: number | null
  category: {
    id: number | null
  }
  stateId: number | null
  state: {
    id: number | null
  }
  countryId: number | null
  country: {
    id: number | null
  }
  cityId: number | null
  city: {
    id: number | null
  }
}

export interface IDiscoverData {

  id: number
  enabled: boolean
  title: string
  subTitle: string | null
  description: string | null
  image: string | null
  link: string | null
  howToRedeem: string | null
  expiryDate: string | null
  spocName: string | null
  spocEmail: string | null
  spocContactNumber: string | null
  contract: string | null
  businessId: number | null
  business: {
    id: number | null
  }
  companyId: number | null
  company: {
    id: number | null
  }
  discoverCategoryId: number | null
  discoverCategory: {
    id: number | null
  }
  stateId: number | null
  state: {
    id: number | null
  }
  countryId: number | null
  country: {
    id: number | null
  }
  cityId: number | null
  city: {
    id: number | null
  }
  categoryId: number | null,
  category: {
    id: number | null
  }
  siteId: number | null,
  site: {
    id: number | null
  }
  brandId: number | null,
  brand: {
    id: number | null
  }
}

export interface IDiscoverCategoryData {
  id: number
  enabled: boolean
  name: string
  icon: string
}

export interface IVolunteerData {
  id: number
  enabled: boolean
  fullName: string
  email: string | null
  contactNumber: string | null
  locationId: number | null
  location: {
    id: number | null
  }
}

export interface ILocationsPhotoData {
  id: number
  enabled: boolean
  image: string | null
  locationId: number | null
  location: {
    id: number | null
  }
  userId: number | null
  user: {
    id: number | null
  }
  adminId: number | null
  admin: {
    id: number | null
  }
}

export interface INotificationsData {
  id: number
  enabled: boolean
  title: string
  message: string | null
  image: string | null
  link: string | null
  page: string | null
  params: string | null
  sendToAll: boolean | null
}

export interface IReviewData {
  id: number
  serviceRating: string
  appExperience: string
  comments: string | null
}
export interface ILocationsAmenityData {
  id: number
  amenityIds: any | undefined
  amenities: any | undefined
}

export interface IBooksData {
  id: number;
  isPaid: boolean;
  title: string;
  totalRating: number;
  description: string;
  author: string;
  samplePdf: string;
  fullPdf: string;
  isbn: string;
  coverPhoto: string;
  createdBy: number;
  createdTimestamp: string;
  updatedBy: number;
  updatedTimestamp: string;
  enabled: boolean;
  titles: ITitlesData[];
  order: number;
}
export interface ITitlesData {
  id: number;
  bookId: string;
  title: string;
  parentId: string;
  order: number;
  isChild: boolean;
  pdf: string;
  createdBy: number;
  createdTimestamp: string;
  updatedBy: number;
  updatedTimestamp: string;
  enabled: boolean;

}

export interface IUsersData {
  id: number,
  enabled: boolean,
  fullName: string,
  contactNumber: string,
  email: string,
  isMonthlyNewsletter: string,
  isProfileUpdate: string,
  usersRoleId: number,
  group: string,
  pushId: string,
  device: string,
  deviceId: string,
  platform: string,
  OSVersion: string,
  uuid: string,
  model: string,
  manufacturer: string,
  appVersion: string,
  createdBy: number,
  createdTimestamp: string,
  updatedBy: number,
  updatedTimestamp: string,
  pushUpdatedTimestamp: string,
}

export interface IPaymentsData {
  id: number;
  txtId: string;
  bookId: string;
  userId: string;
  planId: string;
  createdBy: number;
  createdTimestamp: string;
  updatedBy: number;
  updatedTimestamp: string;
  user: IUserData;
  plan: IPlansData;
}

export interface IPlansData {
  id: number | null;
  duration: number | null;
  enabled: boolean;
  amount: number;
  price:number | null;
  name: string;
  planName:string;
  createdBy: number | null;
  createdTimestamp: string;
  updatedBy: number | null;
  updatedTimestamp: string;
  noOfUsersPurchased?:number | null;

}

export interface ISuppliersData {
  id: number;
  enabled: boolean;
  ownersId: any;
  formName: string;
  commission: number;
  openingBalance: number;
  closingBalance: number;
  contactNumber: string;
  telephone: string;
  faxNo: string;
  email: string;
  GST: string;
  createdBy: number;
  createdTimestamp: string;
  updatedBy: number;
  updatedTimestamp: string;
}

export interface ICustomersData {
  id: number;
  enabled: boolean;
  ownersId: any;
  formName: string;
  openingBalance: number;
  closingBalance: number;
  limit: number;
  contactNumber: string;
  officeAddress: string;
  godownAddress: string;
  godownNumber: string;

  telephone: string;
  faxNo: string;
  email: string;
  GST: string;
  createdBy: number;
  createdTimestamp: string;
  updatedBy: number;
  updatedTimestamp: string;
}

export interface IPrizeData{
  id:number
  enabled:	boolean | null
  title:	string
  description:	string
  prize:number | null
  secondPrize:number | null
  perPersonAmount: number | null
  numberOfParticipants:number | null
  numberOfParticipantsLT:number | null
  numberOfParticipantsPaid:number
  dateTimeOfStart:string
  expiry:string
  totalAmountCollected:number
  image:	string
  participantId:	number 
  winnerId:	number | null
  feature:	boolean
  claimed: boolean
}
export interface IGameParticipantData{
  id:number
  enabled:boolean
  userId:number
  inviteeId:number
  gameId:number
  status:number
}
export interface IPrizeParticipantData{
  id:number
  enabled:boolean
  userId:number
  prizeId:number
  scratched:boolean
  
  
}

export interface IPlanData{
  id: number
enabled:boolean | null
coins:number | null
prize:number | null
planExpiry:string | null
planName:string | null,
noOfUsersPurchased:number
createdTimestamp?:string | null
createdBy?:	number | null
updatedBy?:	number | null
updatedTimestamp?:	string | null
}

export interface IPlanTransactionData{
id:number 
enabled:boolean | null
userId: number
planId:number
referenceId:number
}

export interface IStoreData{
  id: number;
  enabled: boolean;
  mallIds: number;
  clickCount: number;
  createdBy: number;
  coverImage: string;
  showroomImages: string;
  contactEmailId: string;
  address: string;
  videoLink: string;
  description: string;
  brandName: string;
  logo: string;
  priority: number;
  name: string;
  GSTNumber: string;
  PANNumber: string;
  onlineURL: string;
}