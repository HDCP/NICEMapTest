# NICE Bus Map
This project was started to create an embedded live map of NICE bus.

Site can be viewed here: https://hdcp.github.io/NICEMap/index.html

Things to do:

- Add live data feed

These URLs can be parsed for that information (it looks like the feeds limit queries to 10 routes or less):

http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=getrealtime&route_id=MMCS,ElFx,n1,n4,n4X,n6,n6X,n15,n16,n16NC
http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=getrealtime&route_id=n19,n20G,n20H,n21,n22,n22X,n23,n24,n25,n26
http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=getrealtime&route_id=n27,n31,n32,n33,n35,n40_41,n43,n48,n49,n54
http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=getrealtime&route_id=n55,n57,n58,n70,n71,n72,n78,n79,n80

- Add API key for Google Maps
