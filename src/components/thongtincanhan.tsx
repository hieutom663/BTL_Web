import React, { useState, useEffect } from 'react';

interface UserProfile {
  maNV: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  phongBan: string;
  viTri: string;
  ngaySinh: string;
  diaChi: string;
}

const initialData: UserProfile = {
  maNV: 'NV001',
  hoTen: 'Nguyễn Văn A',
  email: 'vana@company.com',
  soDienThoai: '0901234567',
  phongBan: 'Phòng Kỹ thuật (PKT)',
  viTri: 'Lập trình viên Senior',
  ngaySinh: '1995-05-15',
  diaChi: 'Số 10, Đường ABC, TP. Hồ Chí Minh',
};

// --- STYLES ---
const styles = {
  page: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  heading: {
    color: '#343a40',
    borderBottom: '2px solid #dee2e6',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
    gap: '15px 20px',
    marginBottom: '25px',
  },
  label: {
    fontWeight: 600,
    color: '#495057',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    boxSizing: 'border-box' as 'border-box',
    transition: 'border-color 0.2s',
  },
  inputDisabled: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
    cursor: 'not-allowed',
  },
  textArea: {
    resize: 'vertical' as 'vertical',
  },
  actionButtons: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #dee2e6',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  btnPrimary: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    backgroundColor: '#007bff',
    color: 'white',
    transition: 'background-color 0.2s',
  },
  btnSecondary: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    backgroundColor: '#6c757d',
    color: 'white',
    transition: 'background-color 0.2s',
  },
  btnLink: {
    background: 'none',
    color: '#007bff',
    textDecoration: 'underline',
    marginLeft: '15px',
    padding: '10px 0',
    border: 'none',
    cursor: 'pointer',
  },
  alert: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid transparent',
  },
  alertSuccess: {
    color: '#155724',
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  alertError: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  }
};
// --- STYLES ---


// --- ĐỔI MẬT KHẨU ---
interface DoiMatKhauProps {
  onCancel: () => void;
  onSuccess: (msg: string) => void;
  setAlertMessage: (msg: string, isError: boolean) => void;
}

const DoiMatKhauForm: React.FC<DoiMatKhauProps> = ({ onCancel, onSuccess, setAlertMessage }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSavePassword = async () => {
    setAlertMessage('', false); 
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlertMessage('Vui lòng điền đầy đủ tất cả các trường mật khẩu.', true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.', true);
      return;
    }
    
    if (newPassword.length < 6) {
        setAlertMessage('Mật khẩu phải có ít nhất 6 ký tự.', true);
        return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500)); 

    setLoading(false);
    onSuccess('Đổi mật khẩu thành công!');
  };

  return (
    <div>
      <h3 style={{ ...styles.heading, fontSize: '1.5rem', marginTop: '10px' }}>Đổi mật khẩu</h3>

      <div style={styles.infoGrid}>
        <label style={styles.label}>Mật khẩu hiện tại:</label>
        <input 
          type="password" 
          name="currentPassword" 
          value={passwords.currentPassword} 
          onChange={handleChange} 
          style={styles.input}
          disabled={loading}
        />

        <label style={styles.label}>Mật khẩu mới:</label>
        <input 
          type="password" 
          name="newPassword" 
          value={passwords.newPassword} 
          onChange={handleChange} 
          style={styles.input}
          disabled={loading}
        />

        <label style={styles.label}>Xác nhận mật khẩu mới:</label>
        <input 
          type="password" 
          name="confirmPassword" 
          value={passwords.confirmPassword} 
          onChange={handleChange} 
          style={styles.input}
          disabled={loading}
        />
      </div>

      <div style={styles.actionButtons}>
        <button 
          onClick={handleSavePassword} 
          disabled={loading} 
          style={styles.btnPrimary}
        >
          {loading ? 'Đang lưu...' : 'Lưu mật khẩu'}
        </button>
        <button 
          onClick={onCancel} 
          disabled={loading} 
          style={styles.btnSecondary}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};
//


// --- THÔNG TIN CÁ NHÂN ---
const Thongtincanhan: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserProfile>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [originalUserInfo, setOriginalUserInfo] = useState<UserProfile>(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    setUserInfo(initialData); 
    setOriginalUserInfo(initialData);
  }, []);
  
  const setAlertMessage = (msg: string, error: boolean) => {
      setMessage(msg);
      setIsError(error);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
    setIsError(false);
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setIsEditing(false);
    setAlertMessage('Đã hủy thay đổi.', true);
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    setIsError(false);
    
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    setOriginalUserInfo(userInfo); 
    setIsEditing(false);
    setLoading(false);
    setAlertMessage('Cập nhật thông tin cá nhân thành công!', false);
  };
  
  const handlePasswordSuccess = (msg: string) => {
      setShowChangePassword(false);
      setAlertMessage(msg, false);
  }


  if (showChangePassword) {
      return (
        <div style={styles.page}>
            <h2 style={styles.heading}>Thông tin cá nhân</h2>
             {message && (
                <div style={{ 
                    ...styles.alert, 
                    ...(isError ? styles.alertError : styles.alertSuccess)
                }}>
                    {message}
                </div>
              )}
            <DoiMatKhauForm 
                onCancel={() => setShowChangePassword(false)} 
                onSuccess={handlePasswordSuccess}
                setAlertMessage={setAlertMessage}
            />
        </div>
      );
  }


  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>👤 Thông tin cá nhân</h2>
      
      {message && (
        <div style={{ 
            ...styles.alert, 
            ...(isError ? styles.alertError : styles.alertSuccess)
        }}>
            {message}
        </div>
      )}

      <div style={styles.infoGrid}>
        {/* Mã nhân viên */}
        <label style={styles.label}>Mã nhân viên:</label>
        <input 
          type="text" 
          name="maNV" 
          value={userInfo.maNV} 
          disabled 
          style={{ ...styles.input, ...styles.inputDisabled }} 
        />
        {/* Các trường khác... */}
        <label style={styles.label}>Họ và Tên:</label>
        <input 
          type="text" 
          name="hoTen" 
          value={userInfo.hoTen} 
          onChange={handleChange} 
          disabled={!isEditing} 
          style={!isEditing ? { ...styles.input, ...styles.inputDisabled } : styles.input} 
        />

        <label style={styles.label}>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={userInfo.email} 
          onChange={handleChange} 
          disabled={!isEditing} 
          style={!isEditing ? { ...styles.input, ...styles.inputDisabled } : styles.input} 
        />

        <label style={styles.label}>Số điện thoại:</label>
        <input 
          type="tel" 
          name="soDienThoai" 
          value={userInfo.soDienThoai} 
          onChange={handleChange} 
          disabled={!isEditing} 
          style={!isEditing ? { ...styles.input, ...styles.inputDisabled } : styles.input} 
        />

        <label style={styles.label}>Phòng ban:</label>
        <input 
          type="text" 
          name="phongBan" 
          value={userInfo.phongBan} 
          disabled 
          style={{ ...styles.input, ...styles.inputDisabled }} 
        />
        
        <label style={styles.label}>Vị trí:</label>
        <input 
          type="text" 
          name="viTri" 
          value={userInfo.viTri} 
          disabled 
          style={{ ...styles.input, ...styles.inputDisabled }} 
        />
        
        <label style={styles.label}>Ngày sinh:</label>
        <input 
          type="date" 
          name="ngaySinh" 
          value={userInfo.ngaySinh} 
          onChange={handleChange} 
          disabled={!isEditing} 
          style={!isEditing ? { ...styles.input, ...styles.inputDisabled } : styles.input} 
        />
        
        <label style={styles.label}>Địa chỉ:</label>
        <textarea 
          name="diaChi" 
          value={userInfo.diaChi} 
          onChange={handleChange} 
          disabled={!isEditing} 
          rows={3}
          style={!isEditing ? { ...styles.input, ...styles.inputDisabled, ...styles.textArea } : { ...styles.input, ...styles.textArea }} 
        ></textarea>
      </div>

      <div style={styles.actionButtons}>
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              disabled={loading} 
              style={styles.btnPrimary}
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <button 
              onClick={handleCancel} 
              disabled={loading} 
              style={styles.btnSecondary}
            >
              Hủy
            </button>
          </>
        ) : (
          <button onClick={handleEdit} style={styles.btnPrimary}>
           Chỉnh sửa
          </button>
        )}
        {/* Nút Đổi mật khẩu đã được cập nhật */}
        <button onClick={() => setShowChangePassword(true)} style={styles.btnLink}>
           Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default Thongtincanhan;