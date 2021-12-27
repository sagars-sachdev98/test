export interface IAdminsRoleData {
  id: number
  enabled: boolean
  name: string
  adminsRole: any;
}


export interface IFileData {
  id: number
  enabled: boolean
  symbol:string
  year:string
  fileURL:string
}
export interface IEnquiryData {
  id: number
  status: string
  ip: string
  name:string
  state:string
  contactNumber:string
}
export interface IDetailShareData{
  id:number
  enabled:boolean
  fullName:	string
  email:string
  contactNumber:string
  enquiredIds:string
  occupation:string
  address:string
  amountToPay:string
}

export interface IShareData {
  id: number
  enabled: boolean
  year:	string
  fileId:	number
  investorFirstName:	string
  investorMiddleName:	string
  investorLastName:	string
  fatherHusbandFirstName:	string
  fatherHusbandMiddleName:	string
  fatherHusbandLastName:	string
  address:	string
  city:	string
  pincode:	string
  folioNumber:	string
  clientAccountNumber: string
  numberOfShares:	number
  nominalValueOfShares:	number
  actualDateOfTransferToIEPF:	string
}
export interface IBlogData{
  id:number;
  title:string;
  content:string;
  blogWriter:string;
  enabled:boolean;
  featured:boolean;
}


export interface ICompanyData {
  id: number
  enabled: boolean
  symbol:string
  year:string
  fileURL:string
  type:string
  shareValue:number
  companyName:string
}
  

export interface IExpertAdviceData {
  id: number
  enabled: boolean
  fullName:string
  email:string
  contactNumber:string
  occupation:string
  address:string
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
  adminsRoleId: number,
  adminsRole: {
    id: number | null,
    name: string
  }
}

export interface ICountryData {
  id: number
  enabled: boolean
  name: string
  code: string
  zipCodeMinLength: number
  zipCodeMaxLength: number
}

export interface ILoginData {
  id: number
  enabled: boolean
  username: string
  ip: string
  location: string
}

export interface IPermanentBlockData {
  id: number
  ip: string
  message: string
}

export interface ITemporaryBlockData {
  id: number
  ip: string
  lastHitDateTime: string
  isBlocked:boolean
  count:number
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
  contactNumber: string,
  occupation:string,
  address:string,
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


