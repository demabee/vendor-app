import { firestore } from '@/firebase';
import { Timestamp, addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { randomUsers } from './random_users';
import { randomDate } from './random_date';
import { generateRandomItem } from './random_item';

export const updateOrdersItemArray = async () => {
  try {
    const ordersCollection = collection(firestore, 'orders');
    const snapshot = await getDocs(ordersCollection);

    const updatePromises = snapshot.docs.map(async (document) => {
      const orderData = document.data();
      const updatedItems = orderData.items.map((item: any) => {
        if (typeof item === 'string') {
          return { label: item, price: parseFloat((Math.random() * 100).toFixed(2)) };
        }
        return item;
      });

      const totalPrice = updatedItems.reduce((total: any, item: any) => total + item.price, 0);

      return updateDoc(doc(firestore, 'orders', document.id), {
        items: updatedItems,
        totalPrice: totalPrice,
      });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error(error);
  }
};

export const seedEarningsCollection = async () => {
  try {
    const earningsCollection = collection(firestore, 'earnings');
    const generateEarningsDocument = () => {
      const users = randomUsers;
      const user = users[Math.floor(Math.random() * users.length)];
      const items = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, generateRandomItem);
      const totalPrice = items.reduce((total, item) => total + item.price, 0);
      const status = Math.random() < 0.5 ? 'paid' : 'unpaid';

      return {
        customerName: `${user.firstName} ${user.lastName}`,
        gender: user.gender,
        profilePicture: user.imageUrl,
        email: user.email,
        status,
        items,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        orderDate: Timestamp.fromDate(randomDate)
      };
    };

    const numberOfDocuments = 10;
    const addDocPromises = Array.from({ length: numberOfDocuments }).map(() =>
      addDoc(earningsCollection, generateEarningsDocument())
    );

    await Promise.all(addDocPromises);
    console.log('Earnings collection seeded successfully.');
  } catch (error) {
    console.error('Error seeding earnings collection:', error);
  }
};

export const seedOrdersCollection = async () => {
  try {
    const ordersCollection = collection(firestore, 'orders');

    const generateOrdersDocument = () => {
      const users = randomUsers;
      const user = users[Math.floor(Math.random() * users.length)];
      const items = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, generateRandomItem);
      const totalPrice = items.reduce((total, item) => total + item.price, 0);
      const status = Math.random() < 0.5 ? 'active' : 'pending';

      return {
        customerName: `${user.firstName} ${user.lastName}`,
        gender: user.gender,
        profilePicture: user.imageUrl,
        email: user.email,
        status,
        items,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        orderDate: Timestamp.fromDate(randomDate),
      };
    };

    const numberOfDocuments = 10;
    const addDocPromises = Array.from({ length: numberOfDocuments }).map(() =>
      addDoc(ordersCollection, generateOrdersDocument())
    );

    await Promise.all(addDocPromises);
    console.log('Orders collection seeded successfully.');
  } catch (error) {
    console.error('Error seeding orders collection:', error);
  }
};

export const seedWalletBalance = async (userId: string) => {
  try {
    const walletRef = await addDoc(collection(firestore, 'wallets'), { balance: 500, threshold: 0 });
    const userDocRef = doc(firestore, 'users', userId);
    await updateDoc(userDocRef, { wallet: walletRef });

    console.log('Wallet balance seeded successfully');
  } catch (error: any) {
    console.error('Error seeding wallet balance:', error);
  }
};