export interface Supplier {
  name: string;
  url: string;
  logo?: string;
}

export const suppliers: Supplier[] = [
  { name: 'Royal Protein',            url: 'https://royalprotein.com',              logo: '/logos/royalprotein.png' },
  { name: 'Halal Gelatin',            url: 'https://halalgelatin.com.pk',           logo: '/logos/halalgelatin.png' },
  { name: 'California Natural Color', url: 'https://californianaturalcolor.com',    logo: '/logos/calinaturalcolor.png' },
  { name: 'Interstarch',              url: 'https://interstarch.com.ua',            logo: '/logos/interstarch.png' },
  { name: 'SF Flour',                 url: 'https://sflour.com',                    logo: undefined },
  { name: 'Taste Flavourings',        url: 'https://tasteflavourings.com',          logo: undefined },
  { name: 'Minndak',                  url: 'https://minndak.com',                   logo: undefined },
  { name: 'Wilmar International',     url: 'https://wilmar-international.com',      logo: undefined },
  { name: 'Nouryon',                  url: 'https://nouryon.com',                   logo: undefined },
  { name: 'Leiber GmbH',              url: 'https://leibergmbh.de',                 logo: undefined },
  { name: 'Almi',                     url: 'https://almi.at',                       logo: undefined },
];
