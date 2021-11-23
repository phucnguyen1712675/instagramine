const posts = [
  {
    id: 0,
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    profile: 'https://instagram.com/rivi.19.xx/',
    hasStory: true,
    hasStoryBeenSeen: false,
    username: 'mcdonald',
    city: 'New Delhi',
    country: 'India',
    location:
      'https://www.instagram.com/explore/locations/215141266/delhi-india/',
    media: [
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    ],
    isLiked: false,
    isSaved: false,
    likedUser: 'Edward Jones',
    likedOtherUser: [
      'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=456&q=80',
      'https://images.unsplash.com/photo-1613679074971-91fc27180061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      'https://images.unsplash.com/photo-1631913290783-490324506193?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    otherLikedUserAmount: 254,
    likedUsersLink: 'https://www.instagram.com/p/CWiifozP2TD/liked_by/',
    caption: 'Fox can be smarter than a wolf wolf wolf',
    date: 1637194026,
  },
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1167&q=80',
    profile: 'https://instagram.com/victorialoi/',
    hasStory: false,
    username: 'cameron_will',
    city: 'New Delhi',
    country: 'India',
    location:
      'https://www.instagram.com/explore/locations/215141266/delhi-india/',
    media: [
      'https://images.unsplash.com/photo-1484406566174-9da000fda645?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80',
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    ],
    isLiked: true,
    isSaved: true,
    likedUser: 'Lucas',
    likedOtherUser: [
      'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=456&q=80',
      'https://images.unsplash.com/photo-1613679074971-91fc27180061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      'https://images.unsplash.com/photo-1631913290783-490324506193?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    otherLikedUserAmount: 903,
    likedUsersLink: 'https://www.instagram.com/p/CWiifozP2TD/liked_by/',
    caption: 'Million Parrots in india Like a Family Family Family',
    date: 1637194026,
  },
  {
    id: 2,
    avatar:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80',
    profile: 'https://instagram.com/tomuyn.tomie/',
    hasStory: true,
    hasStoryBeenSeen: false,
    username: 'codyfisher',
    city: 'New Delhi',
    country: 'India',
    location:
      'https://www.instagram.com/explore/locations/215141266/delhi-india/',
    media: [
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    ],
    isLiked: false,
    isSaved: false,
    likedUser: 'Yen',
    likedOtherUser: [
      'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=456&q=80',
      'https://images.unsplash.com/photo-1613679074971-91fc27180061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      'https://images.unsplash.com/photo-1631913290783-490324506193?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    otherLikedUserAmount: 127,
    likedUsersLink: 'https://www.instagram.com/p/CWiifozP2TD/liked_by/',
    caption: 'Lazy Weekend',
    date: 1637194026,
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    profile: 'https://instagram.com/yubinyummi/',
    hasStory: false,
    username: 'pat.rick96',
    city: 'New Delhi',
    country: 'India',
    location:
      'https://www.instagram.com/explore/locations/215141266/delhi-india/',
    media: [
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1159&q=80',
    ],
    isLiked: true,
    isSaved: false,
    likedUser: 'Jessica',
    likedOtherUser: [
      'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=456&q=80',
      'https://images.unsplash.com/photo-1613679074971-91fc27180061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      'https://images.unsplash.com/photo-1631913290783-490324506193?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    otherLikedUserAmount: 103,
    likedUsersLink: 'https://www.instagram.com/p/CWiifozP2TD/liked_by/',
    caption: 'Underwater heaven Underwater heaven Underwater heaven',
    date: 1637194026,
  },
  // {
  //   id: 4,
  //   avatar:
  //     'https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //   username: 'murphy.june',
  //   city: 'New Delhi',
  //   country: 'India',
  //   video:
  //     'https://v9.byteicdn.com/c59f9601b5d1b460de749897a2400f76/6196c5ad/video/tos/useast2a/tos-useast2a-pve-0037-aiso/894615e70aed49fbb1d0f87740db5407/?a=1180&br=706&bt=353&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZmo9Fpckag3-I&l=20211118152905010245246069114845ED&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M2o5dTM6Zms6OTMzZjgzM0ApZGVoZWQ4aTs1NzwzNTQ3PGdvaWltcjRvZTZgLS1kL2NzczY1YjBjL2AyYWI1NC5gXzE6Yw%3D%3D&vl=&vr=',
  //   duration: 89,
  //   isLiked: false,
  //   isSaved: false,
  //   likedUser: 'Karl',
  //   likedOtherUser: [
  //     'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=456&q=80',
  //     'https://images.unsplash.com/photo-1613679074971-91fc27180061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
  //     'https://images.unsplash.com/photo-1631913290783-490324506193?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
  //   ],
  //   otherLikedUserAmount: 387,
  //   caption: 'Into the woods Into the woods Into the woods',
  //   date: 1637194026,
  // },
  {
    id: 5,
    avatar:
      'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80',
    profile: 'https://instagram.com/dancerbaodi1503/',
    hasStory: true,
    hasStoryBeenSeen: false,
    username: 'hawkins360',
    city: 'New Delhi',
    country: 'India',
    location:
      'https://www.instagram.com/explore/locations/215141266/delhi-india/',
    media: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    ],
    isLiked: false,
    isSaved: false,
    likedUser: 'Nanny',
    likedOtherUser: [
      'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=456&q=80',
      'https://images.unsplash.com/photo-1613679074971-91fc27180061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      'https://images.unsplash.com/photo-1631913290783-490324506193?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    ],
    otherLikedUserAmount: 387,
    likedUsersLink: 'https://www.instagram.com/p/CWiifozP2TD/liked_by/',
    caption: 'Hi Everyone are you enjoying enjoying',
    date: 1637194026,
  },
];

export default posts;
