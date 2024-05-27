import bcrypt from 'bcrypt';

const password = 'testpassword';

// 新規登録時のハッシュ化
async function testHashAndCompare() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Generated Hashed password:', hashedPassword);

    // ログイン時のパスワード比較
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password match (manual test):', isMatch);
}

testHashAndCompare();




