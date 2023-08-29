SELECT DISTINCT s.ShipperName
FROM Shippers s
JOIN Orders o ON s.ShipperID = o.ShipperID;



SELECT DISTINCT s.ShipperName
FROM Shippers s
LEFT JOIN Orders o ON s.ShipperID = o.ShipperID
WHERE o.OrderID IS NULL;


SELECT DISTINCT c.CustomerName
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
LEFT JOIN Shippers s ON o.ShipperID = s.ShipperID
WHERE s.ShipperID IS NULL;
