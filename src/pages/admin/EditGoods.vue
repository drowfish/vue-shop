<template>
  <div class="EditGoods">
    <header class="clear">
      <span>商品编辑</span>
    </header>
    <div class="content">
      <div class="inputBox">
        <span>商品名称：</span>
        <TextInput class="long" placeholder="请输入商品名称" v-model="goodsName" :initText="goodsName"/>
      </div>
      <div class="inputBox">
        <span>选择类目：</span>
        <Radio v-for="(item,index) in types" :key="item.id" v-model="temTypeId" :initVal="String(initTypeId)" radioName="type" :radioVal="String(item.id)">
          <span class="tips" slot="tips">{{item.name}}</span>
        </Radio>
      </div>
      <div class="inputBox">
        <span>图片地址：</span>
        <!--<TextInput class="long" placeholder="请输入图片地址" v-model="goodsImg" :initText="goodsImg"/>-->
        <el-upload
          class="avatar-uploader"
          action="//127.0.0.1:8080/goods/addImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="goodsImg" :src="basurl+goodsImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="inputBox">
        <span class="verTop">规格详情：</span>
        <ul>
          <li v-for="(item,index) in specList" :key="index">
            <span>名称：</span><TextInput placeholder="请输入规格名称" v-model="item.specname" :initText="item.specname"/>
            <span>库存量：</span><input type="text" class="numInput" v-model.trim.number="item.stocknum"/>
            <span>价格：</span><input type="text" class="numInput" v-model.trim.number="item.unitprice"/>
            <button v-show="specList.length>1" @click="deleteSpec(item)"><i class="iconfont icon-close" /></button>
          </li>
          <li class="addSpec" @click="showPopup">添加规格</li>
        </ul>
      </div>
      <div class="inputBox">
        <span>详情描述：</span>
        <TextInput class="long" placeholder="请输入简单描述" v-model="desc" :initText="desc"/>
      </div>
      <div class="btnBox">
        <button class="confirmBtn" @click="saveChange">保存修改</button>
        <button class="normalBtn" @click="back">返回</button>
      </div>
    </div>
    <Popup title="添加规格" @popupClose="closePopup" v-show="popupShow">
      <div class="popupContent" slot="popupContent">
        <input type="text" ref="specNameInput" placeholder="请输入规格名称" />
        <input type="text" ref="stockNumInput" placeholder="请输入库存量" />
        <input type="text" ref="priceInput" placeholder="请输入单价" />
        <button @click="addConfirm">确认</button>
      </div>
    </Popup>
  </div>
</template>

<script>
  import Popup from '../../components/Popup';
  import TextInput from '../../components/TextInput';
  import Radio from '../../components/Radio';
  import {getTypes,getGoodsInfo,addGoods,addSpec,deleteSpec,updateGoods} from '../../api/admin';
  export default {
    name: 'EditGoods',
    components:{
      Popup,
      Radio,
      TextInput
    },
    data(){
      return{
        basurl: '//127.0.0.1/',
        popupShow:false,
        id:this.$route.params.id,
        goodsName:'',
        types:[],
        initTypeId:'',
        temTypeId:'',
        goodsImg:'',
        desc:'',
        specList:[
          {
            id: '',
            goodsid: '',
            specname:'默认',
            stocknum:0,
            unitprice:0,
          }
        ]
      }
    },
    methods:{
      getTypes(){
        const res = getTypes();
        res
          .then((data)=>{
            this.types = data;
          })
          .catch((e)=>{
            alert(e)
          })
      },
      back(){
        this.$router.go(-1);
      },
      saveChange(){
        if(this.id==='new'){
          const res = addGoods({
            name:this.goodsName,
            typeid:this.temTypeId,
            img:this.goodsImg,
            description:this.desc,
            list:this.specList
          });
          res
            .then(()=>{
              alert('创建商品成功！')
              this.$router.push('/backstage/goods');
            })
            .catch((e)=>{
              alert(e);
            })
        }else{
          const res = updateGoods({
            id:this.id,
            name:this.goodsName,
            typeid:this.temTypeId,
            img:this.goodsImg,
            description:this.desc,
            list:this.specList
          });
          res
            .then(()=>{
              alert("修改成功");
              this.$router.push('/backstage/goods');
            })
            .catch((e)=>{
              alert(e);
            })
        }
      },
      closePopup(){
        this.popupShow = false;
      },
      addConfirm(){
        if(this.id==='new'){
          const name = this.$refs.specNameInput.value;
          const stock = this.$refs.stockNumInput.value;
          const price = this.$refs.priceInput.value;
          this.specList.push({
            id: '',
            goodsid: '',
            specname:name,
            stocknum:stock,
            unitprice:price,
          });
          this.closePopup();
        }else{
          const res = addSpec({
            goodsid:this.id,
            specname:this.$refs.specNameInput.value,
            stocknum:this.$refs.stockNumInput.value,
            unitprice:this.$refs.priceInput.value,
          });
          res.then((spec)=>{
            this.specList.push(spec);
            this.closePopup();
          })
            .catch((e)=>{
              alert(e);
            })
        }
      },
      showPopup(){
        this.popupShow = true;
      },
      deleteSpec(spec){
        if(this.id==='new'){
          console.log("spec:"+spec.specname)
          this.specList.map((item,index)=>{
            if(item.specname == spec.specname){
              this.specList.splice(index,1);
            }
          })
        }else{
          const res = deleteSpec({
            id:spec.id
          });
          res
            .then(()=>{
              this.specList.map((item,index)=>{
                if(item.specName===specname){
                  this.specList.splice(index,1);
                }
              })
            })
            .catch((e)=>{
              alert(e);
            })
        }
      },
      handleAvatarSuccess(res, file) {
        if(res.state == 1) {
          this.goodsImg = res.data;
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传的图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    mounted(){
      this.getTypes();
      //新建商品
      if(this.id==='new'){
      }else{
        const res = getGoodsInfo(this.id);
        res
          .then((data)=>{
            this.temTypeId = data.typeid;
            this.initTypeId = data.typeid;
            this.goodsName = data.name;
            this.goodsImg = data.img;
            this.desc = data.description;
            this.specList = data.list;
          })
          .catch((e)=>{
            alert(e);
          })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/var.less";
  .EditGoods{
    header{
      width: 100%;
      height: 40px;
      line-height: 40px;
      span{
        float: left;
      }
    }
    .content{
      width: 100%;
      background-color: white;
      padding: 10px;
      textarea{
        width: 80%;
        height: 300px;
        border: 1px solid @borderColor;
      }
      .inputBox{
        margin-bottom: 30px;
        span{
          width: 90px;
          display: inline-block;
          color:@fontDefaultColor;
          font-weight: 600;
          vertical-align: middle;
        }
        .verTop{
          vertical-align: top;
        }
        .Radio /deep/ input:checked+.tipsBox{
          &:after{
            background-color:#337da4;
          }
        }
        .tips{
          font-weight: normal;
          width: auto;
          font-size: 13px;
          position: relative;
          left: 3px;
        }
        .val{
          width: auto;
          font-weight: 500;
          color:@fontDeepColor;
        }
        ul{
          display: inline-block;
          width: 500px;
          li{
            width: 100%;
            height: 40px;
            span{
              width: auto;
              font-size: 13px;
              font-weight: 500;
            }
            input{
              margin-right: 10px;
            }
            button{
              width: 50px;
              height: 25px;
              color:#d7514a;
              border:none;
              background-color: white;
              border-radius: 5px;
            }
          }
          .addSpec{
            text-align: center;
            line-height: 30px;
            background-color: #337da4;
            color:white;
            border: none;
            width: 100px;
            height: 30px;
            border-radius: 5px;
            font-size: 13px;
            cursor: pointer;
            margin:10px auto;
          }
        }
        .long{
          width: 900px;
        }
        .numInput{
          width: 30px;
          text-align: center;
          border: none;
          border-bottom: 2px solid @mainColor;
        }
      }
      .btnBox{
        margin: auto;
        display: block;
        width: 250px;
      }
      .confirmBtn{
        display: inline-block;
        margin-right: 30px;
        background-color: #337da4;
        color:white;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
      .normalBtn{
        display: inline-block;
        background-color: grey;
        color:white;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .popupContent{
      padding: 10px;
      input{
        display: block;
        width: 400px;
        margin-bottom: 10px;
        height: 30px;
      }
      button{
        display: block;
        margin:auto;
        background-color: #333333;
        color:white;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
